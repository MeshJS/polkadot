# Polkadot in Mesh

**_Guidelines for a smooth learning journey from a Cardano’s developer perspective_**

## Chapter 1 - Building on Polkadot: Solutions and Comparisons

Polkadot’s multi-chain architecture offers unique opportunities for developers. Below, we break down the types of solutions you can build, tailored for Cardano developers transitioning to Polkadot.

#### **1\. DApp Hosted on a Parachain**

**What it is**:  
Deploy decentralized applications (DApps) on a _parachain_—a specialized blockchain integrated into Polkadot’s ecosystem. Parachains inherit security from Polkadot’s Relay Chain and can communicate with other parachains via Polkadot’s Cross-Chain Messaging Protocol (XCMP).

**Key Features**:

- **Shared Security**: No need to bootstrap your own validator network—security is provided by Polkadot’s Relay Chain.
- **Interoperability**: Seamlessly interact with other parachains (e.g., swapping tokens, sharing data).
- **Scalability**: Dedicated block space ensures your DApp avoids congestion from other chains.

**Use Cases**:

- Decentralized exchanges (DEXs) requiring cross-chain liquidity.
- Gaming platforms needing fast, low-cost transactions.
- Identity systems leveraging data from multiple chains.
- Pretty much everything that a DApp can do on Cardano

**Similarity to Cardano development experience**:  
If you’re used to building on Cardano’s layer-1, parachains offer similar ease of deployment but with built-in cross-chain capabilities.

#### **2\. Parachain Continuously Connected to the Relay Chain**

**What it is**:  
A parachain that maintains an _active, permanent connection_ to Polkadot’s Relay Chain. It participates in Polkadot’s consensus and benefits from continuous shared security.

**Key Features**:

- **Real-Time Security**: Validators from the Relay Chain finalize your blocks.
- **XCMP Access**: Send/receive messages to other parachains instantly.
- **Governance Integration**: Participate in Polkadot’s decentralized governance.

**Use Cases**:

- High-frequency DeFi protocols.
- Social networks requiring real-time data sharing.

**Similarity to Cardano development experience**:  
Think of this as a “layer-1.5” chain—more autonomy than Cardano’s mainnet but with stronger security guarantees than isolated networks. Cardano offers a similar solution with the new partner chains project <https://github.com/input-output-hk/partner-chains> where there is no relay chain but the security is offered by the SPO (Stake Pool Operator) that voluntarily participates in the project.

#### **3\. Parachain Intermittently Connected (On-Demand)**

**What it is**:  
A parachain that connects to the Relay Chain _only when needed_, using Polkadot’s **parathread** model. Pay for block validation as you go (like a “pay-as-you-go” parachain).

**Key Features**:

- **Cost Efficiency**: Avoid leasing a full parachain slot—ideal for low-throughput apps.
- **Flexible Connectivity**: Spin up connectivity during peak demand (e.g., NFT drops).
- **Same Security**: Inherit Relay Chain security when connected.

**Use Cases**:

- Event-driven applications (e.g., ticketing systems).
- Seasonal DApps (e.g., holiday-themed platforms).

**Similarity to Cardano development experience**:  
Similar to “hydra” <https://hydra.family/> (a layer 2 scaling solution focused on high-throughput off-chain transactions), parathreads offer a modular scaling solution—but instead of state channels, they prioritize flexible, cost-aware connectivity to Polkadot’s shared security layer.

#### **4.** **Independent Chain with a Secured Bridge**

**What it is**:  
Build your own standalone blockchain and connect it to Polkadot via a **trustless bridge**. This allows your chain to interact with Polkadot’s ecosystem (e.g., parachains, DApps) without needing to become a parachain.

**Key Features**:

- **Sovereignty**: Full control over your chain’s consensus, tokenomics, and upgrades.
- **Bridge Security**: Use cryptographic protocols (like zk-SNARKs or optimistic verification) to enable trustless transfers of assets/data between chains.
- **Cross-Ecosystem Reach**: Connect not just to Polkadot, but also to other networks like Ethereum, Cosmos, or Cardano.

**Use Cases**:

- Enterprise chains needing to interoperate with public networks.
- Existing projects (e.g., on Cardano) expanding to Polkadot without migrating entirely.

**Similarity to Cardano development experience:**  
Cardano doesn’t provide tools to build your own blockchain, but you could build a partner chain (which is Substrate-based) secured by Cardano’s SPO, but with no bridging to Cardano feature. However independent chains (like _Milkomeda_) can connect to Cardano’s mainnet via bridges.

#### **5\. Solo Chain Without Shared Security**

**What it is**:  
A fully independent blockchain (built with Substrate) that does _not_ connect to Polkadot’s Relay Chain. You’re responsible for your own security and consensus (e.g., PoA, PoS).

**Key Features**:

- **Total Autonomy**: No reliance on Polkadot’s governance or upgrades.
- **Custom Consensus**: Experiment with novel mechanisms (e.g., DAG-based, PoET).
- **Trade-Offs**: No interoperability or shared security.

**Use Cases**:

- Private enterprise networks.
- Research chains testing experimental features.

**Similarity to Cardano development experience**:  
None

### **Choosing your Polkadot path**

| **Solution** | **Best For** | **Security** | **Interoperability** |
| --- | --- | --- | --- |
| DApp on Parachain | Cross-chain apps | High (Relay Chain) | Full |
| Independent Chain + Bridge | Bridging ecosystems | Custom | Partial (via bridge) |
| Continuous Parachain | High-frequency apps | High | Full |
| On-Demand Parachain | Cost-sensitive, intermittent use cases | High (when connected) | Partial |
| Solo Chain | Experiments/private networks | Self-managed | None |

Polkadot’s flexibility lets you tailor your solution to your project’s needs—whether you prioritize security, cost, or sovereignty. For Cardano developers, this opens doors to cross-chain innovation while leveraging familiar concepts like smart contracts and decentralized governance.

## Chapter 2 - Staking Systems: Cardano vs. Polkadot

### **Cardano Node Operators**: **Staking Pool Operators (SPOs)**

**Role**:

- Run nodes, validate transactions, and produce blocks.
- Maintain infrastructure (like server costs, uptime).
- No direct governance power; focused purely on validation.

**Delegation**:

- ADA holders delegate their stake to an SPO’s pool (like voting for a representative).
- SPOs use the **combined stake** of their delegators to increase their chances of being chosen to produce blocks.

**Rewards**:

- SPOs earn a fixed % fee from rewards (e.g., 2-5%) + a variable fee based on pool performance.
- Delegators receive the remaining rewards proportionally to their stake.

**Decentralization Strategy**:

- **Saturation Limit**: Pools are capped (e.g., ~64M ADA) to prevent centralization. Excess stake earns fewer rewards, incentivizing delegation to smaller pools.

### **Polkadot Node Operators**: **Validators**

**Role**:

- Validate transactions, finalize blocks, and participate in **governance** (e.g., voting on proposals).
- Secure the Relay Chain and parachains (broader responsibilities than SPOs).

**Nomination**:

- DOT holders **nominate up to 16 validators** (like endorsing candidates).
- The network’s algorithm selects the **active validator set** (limited to ~1,000) based on nominations.

**Rewards**:

- Validators and nominators split rewards proportionally to their staked DOT.
- Validators earn a small commission (similar to SPO fees), but rewards depend on **era points** (activity-based incentives).

**Security Strategy**:

- **Bonding**: Staked DOT is locked for 28 days to prevent sudden withdrawals (enhances network stability).

### **Key Differences at a Glance**

| **Aspect** | **Cardano (SPOs)** | **Polkadot (Validators)** |
| --- | --- | --- |
| **Selection** | Delegation to pools (no cap per delegator). | Nomination of up to 16 validators. |
| **Role of Node Operator** | Focus: Block production, no governance. | Focus: Block production + governance. |
| **Stake Management** | Saturation limits prevent pool dominance. | Bonding period (28 days) secures the chain. |
| **Reward Mechanics** | SPO fees are transparent and fixed. | Validator commissions vary + era points. |
| **Decentralization** | Encouraged via capped pools. | Encouraged via algorithmic validator rotation. |

**Takeaway**:

- Cardano prioritizes **decentralization via capped pools**.
- Polkadot prioritizes **security via bonded stakes and validator accountability**.

### **Two different philosophies for Risk, Liquidity and Trust**

#### **1\. Liquid Staking & Withdrawals**

- **Cardano**:
  - ✅ **Liquid Staking**: Stake ADA instantly, withdraw anytime (no lock-up).
  - ✅ **No Slashing**: Delegators face **zero risk** if their SPO misbehaves (e.g., downtime). Only the SPO’s rewards are reduced.
  - 🏦 **Analogy**: Like a bank savings account—deposit/withdraw freely, no penalties, and trust in the bank (SPO) is optional.
- **Polkadot**:
  - 🔒 **Bonding Period**: Staked DOT is locked for **28 days** before withdrawal.
  - ⚠️ **Slashing Risk**: Validators _and their nominators_ can lose funds (slashed) if the validator acts maliciously (e.g., double-signing).
  - 🛡️ **Analogy**: Like a term deposit with collateral—your funds are locked temporarily, and you’re financially liable if your chosen validator fails.

#### **2\. User Responsibility & Penalties**

| **Aspect** | **Cardano** | **Polkadot** |
| --- | --- | --- |
| **Delegator Risk** | **None**—SPOs bear operational risk. | **Shared risk**—nominators share slashing penalties. |
| **Liquidity** | Instant stake delegation/withdrawal. | 28-day unbonding period for withdrawals. |
| **Monitoring** | Optional—delegators can “set and forget.” | Active—nominators must vet validators to avoid slashing. |

### **Why this matters**

#### **Cardano’s User-Centric Design**

- Shines for users who prioritize **flexibility** and **low-risk participation**:
  - No need to research SPOs deeply—delegation is “fire-and-forget.”
  - Ideal for casual stakers or institutions needing liquidity (e.g., exchanges).
  - Reflects Cardano’s philosophy: **minimize user burden** while decentralizing stake.

#### **Polkadot’s Security-First Model**

- Prioritizes **accountability** and **anti-fragility**:
  - Bonding periods deter short-term speculation, stabilizing the network.
  - Slashing forces nominators to actively monitor validators, creating a self-policing ecosystem.
  - Aligns with Polkadot’s focus on **interchain security**—malice on one chain risks the whole ecosystem.

### **Trade-Offs at a Glance**

| **Philosophy** | **Cardano** | **Polkadot** |
| --- | --- | --- |
| **User Experience** | “Stake and relax” – no penalties, no lock-up. | “Stake and stay vigilant” – bonding + slashing. |
| **Security Model** | SPOs bear operational risk; trust delegated. | Economic skin-in-the-game for all participants. |
| **Liquidity** | Fully liquid staking. | Illiquid during bonding/unbonding periods. |

### **Final Takeaway**

Cardano’s staking system is **uniquely user-friendly**, prioritizing accessibility and liquidity—ideal for mainstream adoption. Polkadot’s model is **deliberately stricter**, emphasizing collective accountability to secure a multi-chain ecosystem.

## Chapter 3 - The main divergence: Account-Based vs. eUTXO

### **1\. The Account-Based Model Polkadot (same as Ethereum)**

**How It Works**:

- Think of a **centralized bank ledger** where everyone shares the same record.
- Every account’s balance is stored in a **global database** visible to the network.
- Transactions update balances directly in this shared ledger.

**Global Ledger:**

**\- Alice: 100 DOT**

**\- Bob: 50 DOT**

**Transaction: Alice sends 20 DOT to Bob**

**→ Global Ledger updates to:**

**\- Alice: 80 DOT**

**\- Bob: 70 DOT**

**Key Features**:

- **Centralized/Global State**: Like a bank, everyone trusts the same ledger.
- **Mutable Balances**: Balances are overwritten (no record of transaction history).
- **Sequential Updates**: If Alice and Bob both send funds simultaneously, transactions queue up.

**Trade-Offs**:

- ✅ **Simplicity**: Easy to track balances (just check the ledger).
- ❌ **Bottlenecks**: High demand for popular accounts (e.g., a DEX pool) slows the network.

### **2\. The eUTXO Model Cardano (inspired by Bitcoin)**

**How It Works**:

- Think of **physical cash in your wallet**. You own specific “notes” (UTXOs), and spending them requires breaking them into smaller denominations.
- Each UTXO is like a unique bill with a value and ownership tag.
- **Transactions consume UTXOs** and create new ones, like handing over cash and receiving change.

**Alice’s Wallet:**

**\- UTXO 1: 50 ADA (Wallet A)**

**\- UTXO 2: 50 ADA (Wallet B)**

**Transaction: Alice sends 70 ADA to Bob**

**→ Consumes UTXO 1 (50 ADA) + UTXO 2 (50 ADA)**

**→ Creates:**

**\- New UTXO for Bob: 70 ADA (Wallet C)**

**\- New UTXO for Alice (change): 30 ADA (Wallet A or D)**

**Key Features**:

- **Decentralized Ownership**: UTXOs are like cash in your wallet—no global ledger tracks them.
- **Immutable History**: UTXOs are spent, not modified, creating an auditable trail.
- **Parallel Processing**: Different wallets (UTXOs) can transact simultaneously.

**Trade-Offs**:

- ✅ **Scalability**: No waiting in line—transactions using separate UTXOs run in parallel.
- ❌ **Complexity**: Developers must manually track and combine UTXOs (like managing cash).

### **Key Differences Simplified**

| **Aspect** | **Account Model (Polkadot)** | **eUTXO Model (Cardano)** |
| --- | --- | --- |
| **State Management** | Single global ledger (like a bank). | UTXOs are owned locally (like cash). |
| **Transaction Flow** | Sequential updates (wait your turn). | Parallel processing (no waiting). |
| **Security** | Risk of reentrancy (shared state). | No reentrancy (deterministic validation). |
| **Flexibility** | Easy to code, hard to scale. | Hard to code, easy to scale. |

### **Why This Matters for Developers**

- **Account Model**:
  - _Best for_: Apps needing shared state (e.g., a lending protocol where users interact with a central pool).
  - _Watch out for_: Race conditions (e.g., two users trying to borrow the last token).
- **eUTXO Model**:
  - _Best for_: High-throughput apps (e.g., NFT mints, batch payments) or atomic swaps.
  - _Watch out for_: “UTXO management hell” (e.g., splitting/merging UTXOs for complex logic).

### **Final Analogy**

- **Polkadot’s Account Model**:
  - Like a **shared Excel sheet**—everyone edits the same file, but you wait your turn to avoid errors.
- **Cardano’s eUTXO Model**:
  - Like **passing physical cash**—no central ledger, but you need to organize your wallet(s) carefully.

## Chapter 4: Building a contract using Ink! and Astar

_Why Astar Parachain?_  
Polkadot’s Relay Chain is designed for security and interoperability, not smart contract execution. To build a smart contract, you need a **parachain** like [Astar](https://astar.network/), which supports the “contracts” pallet. For Cardano developers: this is like building on Cardano’s mainnet, but instead of deploying directly to the base layer, you deploy to a specialized chain (Astar) that handles smart contracts _and_ connects to Polkadot’s shared security. You could spin your parachain and deploy your smart contracts on it, but we are following an easy path for educational purposes.

### **Step 1: Setup the environment**

#### **1.1 Install dependencies**

```sh
# Install Rust & Cargo (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf <https://sh.rustup.rs> | sh

# Add WASM compilation target
rustup target add wasm32-unknown-unknown

# Install ink! CLI
cargo install cargo-contract --force
```

#### **1.2 Create a new ink! project** my_first_dapp

```sh
cargo contract new my_first_dapp

cd my_first_dapp
```

### **Step 2: Write a simple smart contract (an incrementor)**

#### **2.1 Open lib.rs and replace it with this code**

```sh
#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]

mod my_first_dapp {

    #[ink(storage)]

    pub struct MyContract {

        value: i32,

    }

    impl MyContract {

        #[ink(constructor)]

        pub fn new(init_value: i32) -> Self {

            Self { value: init_value }

        }

        #[ink(message)]

        pub fn get(&self) -> i32 {

            self.value

        }

        #[ink(message)]

        pub fn increment(&mut self) {

            // Use checked_add to prevent overflow

            self.value = self.value

                .checked_add(1)

                .expect("Overflow in increment operation");

        }

    }

}

```

#### **2.2 Explanation**

- **#\[ink(storage)\]**: Defines the contract’s state (like a Cardano datum).
- **#\[ink(message)\]**: Public functions callable by users (similar to Cardano’s endpoints).
- **#\[ink(constructor)\]**: Initializes the contract (like a Plutus validator script).

### **Step 3: Compile the Contract**

cargo contract build

This generates:

- my_first_dapp.wasm (compiled contract).
- metadata.json (ABI for frontend interaction).

### **Step 4: Get SBY tokens (Shibuya Testnet)**

1. **Connect to Shibuya Testnet**:
    - Visit [Astar Portal (Shibuya Testnet)](https://portal.astar.network/shibuya-testnet/assets)
    - Click "Connect Wallet" (use [Talisman](https://talisman.xyz/) wallet for simplicity)
2. **Use the Faucet**:
    - Scroll to the **SBY Token** section
    - Click "Faucet" and request SBY free tokens
    - **Note**: SBY is the testnet token for Shibuya

### **Step 5 (option A - easy): Deploy with UseInk playground**

#### **4.1 Connect to Astar via UseInk**

1. Go to <https://ui.use.ink/> →select **Astar Shibuya**
2. Select **Add new contract**

#### **4.2 Upload the Contract**

1. Click **Upload new contract code**.
2. Set the name (e.g. my_first_dapp)
3. Upload Contract Bundle (which is my_first_dapp.contract)
4. Next and sign

#### **4.3 Call the Contract**

1. **Call get**: Retrieve the current value.
2. **Call increment**: Update the value (requires a small gas fee).

### **Step 5 (option B - facing PolkadotJS): Deploy directly to the parachain**

#### **4.1 Connect to Astar’s Testnet (Shibuya)**

1. Go to [Polkadot-JS Apps](https://polkadot.js.org/apps/) → **Shibuya Testnet**.
2. Navigate to **Developer → Contracts**.

#### **4.2 Upload the Contract**

1. Click **Upload & deploy code**.
2. Upload my_first_dapp.wasm and metadata.json.
3. Set the **initial value** (e.g., 42) during deployment.

#### **4.3 Call the Contract**

1. **Call get**: Retrieve the current value.
2. **Call increment**: Update the value (requires a small gas fee).
