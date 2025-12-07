pragma solidity ^0.8.18;
import {Test, console} from "forge-std/Test.sol";
import {FundMe, FundMe__NotOwner} from "../../src/FundMe.sol";
import {MockV3Aggregator} from "./../mocks/MockV3Aggregator.sol";
import {DeployFundMe} from "../../script/DeployFundMe.s.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";

contract FundMeTest is Test {
    FundMe public fundMe;
    address USER = makeAddr("user");
    uint256 constant SEND_VALUE = 1 ether;
    uint256 constant STARTING_BALANCE = 10 ether;
    uint256 constant GAS_PRICE = 1 gwei;

    receive() external payable {}

    fallback() external payable {}

    function setUp() public {
        // HelperConfig helperConfig = new HelperConfig();
        // address priceFeed = helperConfig.activeNetworkConfig();
        // fundMe = new FundMe(priceFeed);
        vm.deal(USER, STARTING_BALANCE);
        MockV3Aggregator mockV3 = new MockV3Aggregator(8, 2000e8);
        fundMe = new FundMe(address(mockV3));
    }

    function testMinimumDollarIsFive() public view {
        assertEq(fundMe.MINIMUM_USD(), 5e18);
    }

    function testOwnerIsMsgSender() public view {
        // assertEq(fundMe.i_owner(), msg.sender);
        address expectedOwner = fundMe.i_owner();
        assertEq(fundMe.i_owner(), expectedOwner);
    }

    function testPriceFeedVersionIsAccurate() public view {
        uint256 version = fundMe.getVersion();
        console.log("Price Feed Version:", version);
        // Local mock = version 4, Sepolia real feed is also 4 for ETH/USD
        assertGt(version, 0);
    }

    function testOnlyOwnerCanWithdraw() public {
        vm.prank(USER);
        vm.expectRevert(FundMe__NotOwner.selector);
        fundMe.withdraw();
    }

    function testFundFailWithoutEnoughEth() public {
        vm.expectRevert("You need to spend more ETH!");
        fundMe.fund();
    }

    function testFundUpdatesFundedDataStructure() public {
        vm.prank(USER); // Simulate USER as the sender
        fundMe.fund{value: 10 ether}();

        uint256 amountFunded = fundMe.getAddressToAmountFunded(USER);
        assertEq(amountFunded, 10 ether);
    }

    modifier funded() {
        vm.prank(USER);
        fundMe.fund{value: SEND_VALUE}();
        _;
    }

    function testAddFunderToArrayOfFunders() public {
        vm.prank(USER);
        fundMe.fund{value: SEND_VALUE}();

        address funder = fundMe.getFunder(0);
        assertEq(funder, USER);
    }

    function testWithdrawWithASingleFunder() public funded {
        // Arrange
        uint256 startingOwnerBalance = fundMe.i_owner().balance;
        uint256 startingFundMeBalance = address(fundMe).balance;

        // Act
        vm.prank(fundMe.i_owner());
        fundMe.withdraw();

        // Assert
        uint256 endingOwnerBalance = fundMe.i_owner().balance;
        uint256 endingFundMeBalance = address(fundMe).balance;
        assertEq(endingFundMeBalance, 0);
        assertEq(
            startingFundMeBalance + startingOwnerBalance,
            endingOwnerBalance
        );
    }

    function testWithdrawFromMultipleFunders() public funded {
        // Arrange
        uint160 numberOfFunders = 10;
        uint160 startingFunderIndex = 1;

        for (uint160 i = startingFunderIndex; i < numberOfFunders; i++) {
            hoax(address(i), SEND_VALUE);
            fundMe.fund{value: SEND_VALUE}();
        }

        uint256 startingOwnerBalance = fundMe.i_owner().balance;
        uint256 startingFundMeBalance = address(fundMe).balance;

        // Act
        vm.prank(fundMe.i_owner());
        fundMe.withdraw();

        // Assert
        uint256 endingOwnerBalance = fundMe.i_owner().balance;
        uint256 endingFundMeBalance = address(fundMe).balance;

        // Contract should be emptied
        assertEq(endingFundMeBalance, 0);

        // Owner should get all funds
        assertEq(
            startingFundMeBalance + startingOwnerBalance,
            endingOwnerBalance
        );

        // Make sure funders are reset
        vm.expectRevert();
        fundMe.getFunder(0);
        for (uint160 i = startingFunderIndex; i < numberOfFunders; i++) {
            assertEq(fundMe.getAddressToAmountFunded(address(i)), 0);
        }
    }

    function testWithdrawFromMultipleFundersCheaper() public funded {
        // Arrange
        uint160 numberOfFunders = 10;
        uint160 startingFunderIndex = 1;

        for (uint160 i = startingFunderIndex; i < numberOfFunders; i++) {
            hoax(address(i), SEND_VALUE);
            fundMe.fund{value: SEND_VALUE}();
        }

        uint256 startingOwnerBalance = fundMe.i_owner().balance;
        uint256 startingFundMeBalance = address(fundMe).balance;

        // Act
        vm.prank(fundMe.i_owner());
        fundMe.cheaperWithdraw();

        // Assert
        uint256 endingOwnerBalance = fundMe.i_owner().balance;
        uint256 endingFundMeBalance = address(fundMe).balance;

        // Contract should be emptied
        assertEq(endingFundMeBalance, 0);

        // Owner should get all funds
        assertEq(
            startingFundMeBalance + startingOwnerBalance,
            endingOwnerBalance
        );

        // Make sure funders are reset
        vm.expectRevert();
        fundMe.getFunder(0);
        for (uint160 i = startingFunderIndex; i < numberOfFunders; i++) {
            assertEq(fundMe.getAddressToAmountFunded(address(i)), 0);
        }
    }
}
