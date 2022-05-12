//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

library TokenRoles {
    bytes32 constant TARGET = keccak256("TARGET");
    bytes32 constant CHELPIS = keccak256("CHELPIS");

    struct Members {
        address target;
        address[] chelpis;
    }
}

contract HaveFunNFT is ERC721Enumerable, AccessControl {
    using TokenRoles for *;

    struct TokenURIMapping {
        uint256 tokenId;
        string tokenURI;
    }

    // default 34 for Danny, 1 for Judy
    uint256 private _defaultMaxSupply;
    uint256 private _maxSupply;
    uint256 private _deployTime;

    // for opensea
    address private _owner;

    // Danny or Judy's address
    address private _target;

    string private _tokenURIPrefix;

    constructor(string memory name_, string memory symbol_, uint256 maxSupply_, TokenRoles.Members memory ms_) ERC721(name_, symbol_) {
        _deployTime = block.timestamp;

        _defaultMaxSupply = maxSupply_;
        _maxSupply = maxSupply_;
        _target = ms_.target;
        _owner = ms_.target;

        _setupRole(TokenRoles.TARGET, ms_.target);
        for (uint256 i = 0; i < ms_.chelpis.length; i++) {
            _setupRole(TokenRoles.CHELPIS, ms_.chelpis[i]);
        }

        // setup target address as admin
        _setRoleAdmin(TokenRoles.CHELPIS, TokenRoles.TARGET);
        airdrop();
    }

    function airdrop() public {
        require(totalSupply() < _maxSupply, "no more tokens to be airdropped");

        uint256 totalSupply = totalSupply();
        for (uint256 i = totalSupply + 1; i <= _maxSupply; i++) {
            _safeMint(_target, i);
        }
    }

    // external setter functions
    function setMaxSupply() external onlyRole(TokenRoles.TARGET) {
        uint256 yeerPassed = 0;
        uint256 time = _deployTime + 48 weeks;
        for (;time < block.timestamp; time += 52 weeks) {
            yeerPassed = yeerPassed + 1;
        }
        require(block.timestamp - (time - 52 weeks) < 8 weeks, "NOT ALLOWED TO INCREASE SUPPLY DURING THE MIDDLE OF A YEAR");
        _maxSupply = _defaultMaxSupply + yeerPassed;
    }

    function setTokenURIPrefix(string memory tokenURIPrefix_) external onlyRole(TokenRoles.CHELPIS) {
        _tokenURIPrefix = tokenURIPrefix_;
    }

    function congratulateTarget(string memory msg_) external {
        emit Contgrats(msg_);
    }

    // external view functions
    function maxSupply() external view returns (uint256) {
        return _maxSupply;
    }

    function owner() external view returns (address) {
        return _owner;
    }

    // public pure functions
    function grantRole(bytes32 role, address) public view override(AccessControl) onlyRole(getRoleAdmin(role)) {
        revert("YOU ARE NOT ALLOWED TO GRANT NEW ROLE");
    }

    function approve(address, uint256)
        public
        pure
        override(ERC721)
    {
        revert("YOU ARE NOT ALLOWED TO DO ANYTHING");
    }

    function setApprovalForAll(address, bool)
        public
        pure
        override(ERC721)
    {
        revert("YOU ARE NOT ALLOWED TO DO ANYTHING");
    }

    function transferFrom(
        address,
        address,
        uint256
    ) public pure override(ERC721) {
        revert("YOU ARE NOT ALLOWED TO DO ANYTHING");
    }

    function safeTransferFrom(
        address,
        address,
        uint256
    ) public pure override(ERC721) {
        revert("YOU ARE NOT ALLOWED TO DO ANYTHING");
    }

    function safeTransferFrom(
        address,
        address,
        uint256,
        bytes memory
    ) public pure override(ERC721) {
        revert("YOU ARE NOT ALLOWED TO DO ANYTHING");
    }


    // public view functions
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal view override(ERC721) returns (string memory) {
        return _tokenURIPrefix;
    }

    event Contgrats(string);
}
