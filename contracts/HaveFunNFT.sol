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
    uint256 private _maxSupply;

    // for opensea
    address private _owner;

    // Danny or Judy's address
    address private _target;

    // token id -> token URI mapping
    mapping (uint256 => string) private _tokenURIs;

    constructor(string memory name_, string memory symbol_, uint256 maxSupply_, TokenRoles.Members memory ms_) ERC721(name_, symbol_) {
        _maxSupply = maxSupply_;
        _target = ms_.target;

        _setupRole(TokenRoles.TARGET, ms_.target);
        for (uint256 i = 0; i < ms_.chelpis.length; i++) {
            _setupRole(TokenRoles.CHELPIS, ms_.chelpis[i]);
        }

        // setup target address as admin
        _setRoleAdmin(TokenRoles.CHELPIS, TokenRoles.TARGET);
    }

    function airdrop(uint256[] memory tokenIds_) external onlyRole(TokenRoles.CHELPIS) {
        for (uint256 i = 0; i < tokenIds_.length; i++) {
            require(0 < tokenIds_[i] && tokenIds_[i] <= _maxSupply, "invalid token id");
            _safeMint(_target, tokenIds_[i]);
        }
    }

    // external setter functions
    function setMaxSupply(uint256 maxSupply_) external onlyRole(TokenRoles.CHELPIS) {
        _maxSupply = maxSupply_;
    }

    function setTokenURI(TokenURIMapping[] memory tokenURIs_) external onlyRole(TokenRoles.CHELPIS) {
        for (uint256 i = 0; i < tokenURIs_.length; i++) {
            _tokenURIs[tokenURIs_[i].tokenId] = tokenURIs_[i].tokenURI;
        }
    }

    // external view functions
    function owner() external view returns (address) {
        return _owner;
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

}
