pragma solidity ^0.7.6;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

interface IERC20 {
  function balanceOf(address account) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function approve(address spender, uint256 amount) external returns (bool);
}


contract SingleSwap {
  address public constant routerAddress = 0xE592427A0AEce92De3Edee1F18E0157C05861564;
  ISwapRouter public immutable swapRouter = ISwapRouter(routerAddress);

  address public constant MATIC = 0x0000000000000000000000000000000000001010;
  address public constant DAI = 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063;

  IERC20 public maticToken = IERC20(MATIC);

  // For this example, we will set the pool fee to 0.05%.
  uint24 public constant poolFee = 500;

  constructor() {}

  function swapExactInputSingle(uint256 amountIn) external returns (uint256 amountOut)
  {
    maticToken.approve(address(swapRouter), amountIn);

    ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
    .ExactInputSingleParams({
      tokenIn: MATIC,
      tokenOut: DAI,
      fee: poolFee,
      recipient: address(this),
      deadline: block.timestamp,
      amountIn: amountIn,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0
    });

    amountOut = swapRouter.exactInputSingle(params);
  }
}
