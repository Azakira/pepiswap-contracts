pragma solidity =0.5.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

/**
 * @title PepiToken
 * @dev Very simple ERC20 Token, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */
contract PepiToken is ERC20Detailed, ERC20 {
    address public admin;

    // When the contract is deployed, we want to mint a specific amount of token and send it to the admin
    constructor() ERC20Detailed("PepiToken", "PPT", 18) public {
        _mint(msg.sender, 1000 * 10 ** 18);
        admin = msg.sender;
    }

    // We want to be able to mint new tokens
    function mint(address to, uint amount) external {
        require(msg.sender == admin, 'only admin');
        _mint(to, amount);
    }

    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }
}
