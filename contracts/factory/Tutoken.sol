pragma solidity =0.5.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";


/**
 * @title Tutoken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */

contract Tutoken is ERC20Detailed, ERC20{
    address public admin;

    mapping(uint => uint) public tutorialAmount;
    mapping(address => mapping(uint => bool)) public tutorialClaimed;

    event TutorialCreated(uint indexed id, uint amount);
    event TutorialClaimed(address indexed user, uint indexed id, uint amount);

    function claimTutorial(uint id) public {
        require(tutorialAmount[id] > 0, "Pepiswap: RESSOURCE_DOES_NOT_EXIST");
        require(!tutorialClaimed[msg.sender][id], "Pepiswap: ALREADY_CLAIMED");
        tutorialClaimed[msg.sender][id] = true;
        _mint(msg.sender, tutorialAmount[id]);
        emit TutorialClaimed(msg.sender, id, tutorialAmount[id]);
    }

    function createTutorial(uint id, uint amount) public {
        require(msg.sender == admin, 'Pepiswap: ONLY_ADMIN');
        require(tutorialAmount[id] == 0, "Pepiswap: RESSOURCE_AlREADY_EXIST");
        tutorialAmount[id] = amount;
        emit TutorialCreated(id, amount);
    }

    //function to remove a tutorial by index from the array
    function removeTutorial(uint id) public {
        require(msg.sender == admin, 'Pepiswap: ONLY_ADMIN');
        require(tutorialAmount[id] > 0, "Pepiswap: RESSOURCE_DOES_NOT_EXIST");
        delete tutorialAmount[id];
    }

    constructor() ERC20Detailed("TuToken", "TTK", 18) public {
        admin = msg.sender;
    }

    function mint(address to, uint amount) external {
        require(msg.sender == admin, 'Pepiswap: ONLY_ADMIN');
        _mint(to, amount);
    }

    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }
}
