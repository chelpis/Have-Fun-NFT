# Have Fun NFT Technical Specification v1.0.0
## Introduction
### Overview
Have Fun NFT 是個基於 EIP-721 標準，且實作了 metadata, enumerable extension, 並負加了 access control 的智能合約。

其目的是空投一檔 token collection 給某個目標地址，但不提供除此之外的操作，如轉移等。讓那些 token 永遠的"卡"在目標地址裡。

因此 Have Fun NFT 主要只提供兩種能夠供外界操作的 functions: `airdrop`, `congratulateTarget`, 分別可以 airdrop 剩餘的 token 和送上祝賀詞給在合約 deploy 階段就決定好的一個 `target` address。

並提供了 `setMaxSupply`, `setTokenURIPrefix`, `revokeRole` 3 種特權操作, 除此之外的功能包括 `transferFrom`, `safeTransferFrom`, `approve`, `setApprovalForAll` 等都會被 revert，切記小心操作。

### Non-goal or out of Scope
被玩弄的目標地址本人的心情不在此合約關心的範圍。

## Architecture

### Note
token id: `1 ≤ token id ≤ max supply`

### Constructor
部署合約需要的參數有: 
- `name: string`, `symbol: string`: EIP721 標準所需
- `initialMaxSupply: uint256`: 合約起始的總發行量, 透過 `setMaxSupply` 調整可再調整實際總發行量, 請參照 `setMaxSupply`
- `target`: Have Fun NFT 想玩弄的目標地址
- `chelpis`: 能對 Have Fun NFT 做某些特權操作的地址

在部署時，除了設定相對應的權限及參數，為了方便起見還會在一開始就呼叫 `airdrop` 來 mint 當前所能發行的 token 數量給 `target` address。

### airdrop

因此合約的目為空投所有的 token 給唯一的一個目標，因此此 airdrop function 不需太 general (提供參數，讓人指定要空投哪些 token 給目標), 一次空投能空投的 token 就好。

考慮到 max supply 有可能增加，airdrop function 實作需注意，空投"剩餘的 token" (e.g. total supply < token id ≤ max supply) 給目標就好。

### congratulateTarget

提供一個 funciton 接收一個 string message，emit 一個 `Congrats` event 來給予目標地址祝福。

### setMaxSupply

想讓 `max supply = initial max supply + year passed after contract deployed`, 且一年只有一段時間可以設 (理想上是只有和部署的同一天才可以設)。
考慮到鏈上 unix epoch time 計算精確會很複雜 (需考慮閏年等)，且可呼叫的時間 range 只有一天太過苛刻, miss 掉就得等下一年，
因此容許呼叫時間滿足下列條件可以增加 max supply:
```
    call time - deployed time % 52 ≤ 4 or call time - deployed time % 52 ≥ 48
```

此外實作時需考慮到還是有可能有幾年忘了增發，但下一次增發的時候，還是得滿足 `max supply = initial max supply + year passed after contract deployed` 才行。

此 function 限 TARGET role 可以呼叫, 也就是只有 target address 可以呼叫。畢竟是否增發一個自己無法控制的 token collection 還是應該由 target 自己的意願決定。
可參考 access control。

### setTokenURIPrefix
為了方便起見，所有的 token 都是 host 在同一個地方，每個 token 的 uri = `tokenURIPrefix + tokenid`

此 function 只限 CHELPIS role 可以呼叫，因為這個合約的目的是給 target 一堆他無法操控的 token，因此沒有理由讓他可以 config token uri 要 host 在哪裡。

### Access Control
#### Roles
- TARGET: 
    - 代表 `target` address 的 role, target address 是唯一的 role member。
    - 是 CHELPIS role 的 admin role。
    - 語意上包含了 `target` 是這檔 token collection 的 owner，理論上該擁有這檔 collection 的最高權限。
- CHELPIS: 
    - 代表能執行其他特權操作的 role，其 admin role 為 TARGET。

#### grantRole
一般的 grant role 是某個 role `R` 的 admin role 的某個 role member 可以 grant 任何地址為 role `R` 的 role member。但考慮到如果 `target` 可以 grant 自己為 `CHELPIS` 的 role member的話，就可以執行 `setTokenURIPrefix` 的操作，違反了規格。因此此合約不開放使用 `grantRole` 功能。

#### revokeRole
畢竟 `target` 還是理論上這檔 token collection 的 owner，讓他可以取消某些地址的特權操作應不為過。

### Invalid operations
為了不讓 token owner, `target` 可以操控這些 tokens，`transferFrom`, `safeTransferFrom`, `approve`, `setApprovalForAll` 都必須被 revert。

## Futre Work
- Gas Consumption Optimization
- 能有更有趣或更客製化的限制 ？
- 多個 target，改用 EIP-1155 ？
- Proxy pattern, upgradable contract ?

