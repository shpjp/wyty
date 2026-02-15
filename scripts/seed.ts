import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { problems } from '../lib/schema'

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client)

const problemsData = [
  // 🔹 1D DP / Basic Recurrence
  {
    title: "LC 509 – Fibonacci Number",
    description: "Calculate the nth Fibonacci number using dynamic programming.",
    leetcodeUrl: "https://leetcode.com/problems/fibonacci-number/",
    solution: `class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        
        int prev2 = 0;
        int prev1 = 1;
        
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "EASY" as const,
    tags: ["DP", "Math", "Fibonacci"],
  },
  {
    title: "LC 70 – Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.",
    leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
    solution: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        
        int prev2 = 1;
        int prev1 = 2;
        
        for (int i = 3; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "EASY" as const,
    tags: ["DP", "Math", "Fibonacci"],
  },
  {
    title: "LC 746 – Min Cost Climbing Stairs",
    description: "Calculate the minimum cost to climb stairs where each step has a cost.",
    leetcodeUrl: "https://leetcode.com/problems/min-cost-climbing-stairs/",
    solution: `class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        int prev2 = cost[0];
        int prev1 = cost[1];
        
        for (int i = 2; i < n; i++) {
            int current = cost[i] + min(prev1, prev2);
            prev2 = prev1;
            prev1 = current;
        }
        
        return min(prev1, prev2);
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "EASY" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 198 – House Robber",
    description: "Rob houses to maximize money without robbing adjacent houses.",
    leetcodeUrl: "https://leetcode.com/problems/house-robber/",
    solution: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        if (n == 1) return nums[0];
        
        int prev2 = 0;
        int prev1 = nums[0];
        
        for (int i = 1; i < n; i++) {
            int current = max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 213 – House Robber II",
    description: "Rob houses arranged in a circle without robbing adjacent houses.",
    leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/",
    solution: `class Solution {
public:
    int robLinear(vector<int>& nums, int start, int end) {
        int prev2 = 0, prev1 = 0;
        for (int i = start; i <= end; i++) {
            int temp = max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = temp;
        }
        return prev1;
    }
    
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        return max(robLinear(nums, 0, n-2), robLinear(nums, 1, n-1));
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 740 – Delete and Earn",
    description: "Delete numbers to earn points, but deleting a number removes all adjacent values.",
    leetcodeUrl: "https://leetcode.com/problems/delete-and-earn/",
    solution: `class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        int maxNum = *max_element(nums.begin(), nums.end());
        vector<int> points(maxNum + 1, 0);
        
        for (int num : nums) {
            points[num] += num;
        }
        
        int prev2 = 0, prev1 = 0;
        for (int i = 0; i < points.size(); i++) {
            int temp = max(prev1, prev2 + points[i]);
            prev2 = prev1;
            prev1 = temp;
        }
        
        return prev1;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Hash Table"],
  },
  {
    title: "LC 91 – Decode Ways",
    description: "Count the number of ways to decode a digit string.",
    leetcodeUrl: "https://leetcode.com/problems/decode-ways/",
    solution: `class Solution {
public:
    int numDecodings(string s) {
        int n = s.length();
        if (n == 0 || s[0] == '0') return 0;
        
        int prev2 = 1, prev1 = 1;
        
        for (int i = 1; i < n; i++) {
            int current = 0;
            if (s[i] != '0') current = prev1;
            
            int twoDigit = stoi(s.substr(i-1, 2));
            if (twoDigit >= 10 && twoDigit <= 26) {
                current += prev2;
            }
            
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "String"],
  },

  // 🔹 2D DP / Grid DP
  {
    title: "LC 62 – Unique Paths",
    description: "Count unique paths from top-left to bottom-right in a grid.",
    leetcodeUrl: "https://leetcode.com/problems/unique-paths/",
    solution: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m, vector<int>(n, 1));
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
        
        return dp[m-1][n-1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Math", "Combinatorics"],
  },
  {
    title: "LC 63 – Unique Paths II",
    description: "Count unique paths in a grid with obstacles.",
    leetcodeUrl: "https://leetcode.com/problems/unique-paths-ii/",
    solution: `class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        if (grid[0][0] == 1) return 0;
        
        vector<vector<int>> dp(m, vector<int>(n, 0));
        dp[0][0] = 1;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    dp[i][j] = 0;
                } else {
                    if (i > 0) dp[i][j] += dp[i-1][j];
                    if (j > 0) dp[i][j] += dp[i][j-1];
                }
            }
        }
        
        return dp[m-1][n-1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Matrix"],
  },
  {
    title: "LC 64 – Minimum Path Sum",
    description: "Find minimum path sum from top-left to bottom-right in a grid.",
    leetcodeUrl: "https://leetcode.com/problems/minimum-path-sum/",
    solution: `class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));
        dp[0][0] = grid[0][0];
        
        for (int i = 1; i < m; i++) dp[i][0] = dp[i-1][0] + grid[i][0];
        for (int j = 1; j < n; j++) dp[0][j] = dp[0][j-1] + grid[0][j];
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]);
            }
        }
        
        return dp[m-1][n-1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Matrix"],
  },
  {
    title: "LC 120 – Triangle",
    description: "Find minimum path sum from top to bottom in a triangle.",
    leetcodeUrl: "https://leetcode.com/problems/triangle/",
    solution: `class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp = triangle[n-1];
        
        for (int i = n-2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[j] = triangle[i][j] + min(dp[j], dp[j+1]);
            }
        }
        
        return dp[0];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 931 – Minimum Falling Path Sum",
    description: "Find minimum falling path sum in a matrix.",
    leetcodeUrl: "https://leetcode.com/problems/minimum-falling-path-sum/",
    solution: `class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<int> dp = matrix[0];
        
        for (int i = 1; i < n; i++) {
            vector<int> temp(n);
            for (int j = 0; j < n; j++) {
                int minPrev = dp[j];
                if (j > 0) minPrev = min(minPrev, dp[j-1]);
                if (j < n-1) minPrev = min(minPrev, dp[j+1]);
                temp[j] = matrix[i][j] + minPrev;
            }
            dp = temp;
        }
        
        return *min_element(dp.begin(), dp.end());
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Matrix"],
  },

  // 🔹 Subsequence DP
  {
    title: "LC 300 – Longest Increasing Subsequence",
    description: "Find the length of the longest strictly increasing subsequence.",
    leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
    solution: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> dp;
        
        for (int num : nums) {
            auto it = lower_bound(dp.begin(), dp.end(), num);
            if (it == dp.end()) {
                dp.push_back(num);
            } else {
                *it = num;
            }
        }
        
        return dp.size();
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Binary Search", "Array"],
  },
  {
    title: "LC 1143 – Longest Common Subsequence",
    description: "Find the length of the longest common subsequence between two strings.",
    leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
    solution: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.length();
        int n = text2.length();
        
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i-1] == text2[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        
        return dp[m][n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 516 – Longest Palindromic Subsequence",
    description: "Find the length of the longest palindromic subsequence.",
    leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-subsequence/",
    solution: `class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int n = s.length();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        
        for (int i = n-1; i >= 0; i--) {
            dp[i][i] = 1;
            for (int j = i+1; j < n; j++) {
                if (s[i] == s[j]) {
                    dp[i][j] = dp[i+1][j-1] + 2;
                } else {
                    dp[i][j] = max(dp[i+1][j], dp[i][j-1]);
                }
            }
        }
        
        return dp[0][n-1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 72 – Edit Distance",
    description: "Find minimum edit distance between two strings.",
    leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
    solution: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i-1] == word2[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
                }
            }
        }
        
        return dp[m][n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 115 – Distinct Subsequences",
    description: "Count distinct subsequences of s that equals t.",
    leetcodeUrl: "https://leetcode.com/problems/distinct-subsequences/",
    solution: `class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.length(), n = t.length();
        vector<vector<unsigned long long>> dp(m+1, vector<unsigned long long>(n+1, 0));
        
        for (int i = 0; i <= m; i++) dp[i][0] = 1;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                dp[i][j] = dp[i-1][j];
                if (s[i-1] == t[j-1]) {
                    dp[i][j] += dp[i-1][j-1];
                }
            }
        }
        
        return dp[m][n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 583 – Delete Operation for Two Strings",
    description: "Find minimum deletions to make two strings equal.",
    leetcodeUrl: "https://leetcode.com/problems/delete-operation-for-two-strings/",
    solution: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i-1] == word2[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        
        int lcs = dp[m][n];
        return (m - lcs) + (n - lcs);
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 1312 – Minimum Insertion Steps to Make a String Palindrome",
    description: "Find minimum insertions to make a string palindrome.",
    leetcodeUrl: "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/",
    solution: `class Solution {
public:
    int minInsertions(string s) {
        int n = s.length();
        string rev = s;
        reverse(rev.begin(), rev.end());
        
        vector<vector<int>> dp(n+1, vector<int>(n+1, 0));
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i-1] == rev[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        
        return n - dp[n][n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "String"],
  },

  // 🔹 Knapsack Pattern
  {
    title: "LC 416 – Partition Equal Subset Sum",
    description: "Determine if array can be partitioned into two equal sum subsets.",
    leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
    solution: `class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % 2) return false;
        
        int target = sum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        
        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        
        return dp[target];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 494 – Target Sum",
    description: "Count ways to assign signs to make sum equal to target.",
    leetcodeUrl: "https://leetcode.com/problems/target-sum/",
    solution: `class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (abs(target) > sum || (sum + target) % 2) return 0;
        
        int subsetSum = (sum + target) / 2;
        vector<int> dp(subsetSum + 1, 0);
        dp[0] = 1;
        
        for (int num : nums) {
            for (int j = subsetSum; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        
        return dp[subsetSum];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Backtracking"],
  },
  {
    title: "LC 322 – Coin Change",
    description: "Find minimum coins needed to make amount.",
    leetcodeUrl: "https://leetcode.com/problems/coin-change/",
    solution: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i >= coin) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "BFS"],
  },
  {
    title: "LC 518 – Coin Change II",
    description: "Count ways to make amount using given coins.",
    leetcodeUrl: "https://leetcode.com/problems/coin-change-ii/",
    solution: `class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;
        
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        
        return dp[amount];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 1049 – Last Stone Weight II",
    description: "Minimize the weight of the last stone.",
    leetcodeUrl: "https://leetcode.com/problems/last-stone-weight-ii/",
    solution: `class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int sum = accumulate(stones.begin(), stones.end(), 0);
        int target = sum / 2;
        
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        
        for (int stone : stones) {
            for (int j = target; j >= stone; j--) {
                dp[j] = dp[j] || dp[j - stone];
            }
        }
        
        for (int i = target; i >= 0; i--) {
            if (dp[i]) return sum - 2 * i;
        }
        
        return 0;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },

  // 🔹 DP on Strings / Matching
  {
    title: "LC 10 – Regular Expression Matching",
    description: "Implement regular expression matching with '.' and '*'.",
    leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching/",
    solution: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<bool>> dp(m+1, vector<bool>(n+1, false));
        dp[0][0] = true;
        
        for (int j = 2; j <= n; j++) {
            if (p[j-1] == '*') {
                dp[0][j] = dp[0][j-2];
            }
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j-1] == '*') {
                    dp[i][j] = dp[i][j-2];
                    if (s[i-1] == p[j-2] || p[j-2] == '.') {
                        dp[i][j] = dp[i][j] || dp[i-1][j];
                    }
                } else if (s[i-1] == p[j-1] || p[j-1] == '.') {
                    dp[i][j] = dp[i-1][j-1];
                }
            }
        }
        
        return dp[m][n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "String", "Recursion"],
  },
  {
    title: "LC 44 – Wildcard Matching",
    description: "Implement wildcard pattern matching with '?' and '*'.",
    leetcodeUrl: "https://leetcode.com/problems/wildcard-matching/",
    solution: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<bool>> dp(m+1, vector<bool>(n+1, false));
        dp[0][0] = true;
        
        for (int j = 1; j <= n; j++) {
            if (p[j-1] == '*') {
                dp[0][j] = dp[0][j-1];
            }
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j-1] == '*') {
                    dp[i][j] = dp[i-1][j] || dp[i][j-1];
                } else if (p[j-1] == '?' || s[i-1] == p[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                }
            }
        }
        
        return dp[m][n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "String", "Greedy"],
  },

  // 🔹 DP on Stocks
  {
    title: "LC 121 – Best Time to Buy and Sell Stock",
    description: "Find maximum profit with one transaction.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    solution: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;
        
        for (int price : prices) {
            minPrice = min(minPrice, price);
            maxProfit = max(maxProfit, price - minPrice);
        }
        
        return maxProfit;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "EASY" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 122 – Best Time to Buy and Sell Stock II",
    description: "Find maximum profit with unlimited transactions.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
    solution: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int profit = 0;
        
        for (int i = 1; i < prices.size(); i++) {
            if (prices[i] > prices[i-1]) {
                profit += prices[i] - prices[i-1];
            }
        }
        
        return profit;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Greedy"],
  },
  {
    title: "LC 123 – Best Time to Buy and Sell Stock III",
    description: "Find maximum profit with at most two transactions.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
    solution: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int buy1 = INT_MAX, buy2 = INT_MAX;
        int profit1 = 0, profit2 = 0;
        
        for (int price : prices) {
            buy1 = min(buy1, price);
            profit1 = max(profit1, price - buy1);
            buy2 = min(buy2, price - profit1);
            profit2 = max(profit2, price - buy2);
        }
        
        return profit2;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 188 – Best Time to Buy and Sell Stock IV",
    description: "Find maximum profit with at most k transactions.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
    solution: `class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        if (prices.empty()) return 0;
        
        vector<int> buy(k+1, INT_MAX);
        vector<int> profit(k+1, 0);
        
        for (int price : prices) {
            for (int i = 1; i <= k; i++) {
                buy[i] = min(buy[i], price - profit[i-1]);
                profit[i] = max(profit[i], price - buy[i]);
            }
        }
        
        return profit[k];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 309 – Best Time to Buy and Sell Stock with Cooldown",
    description: "Find maximum profit with cooldown period.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    solution: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int sold = 0, held = INT_MIN, reset = 0;
        
        for (int price : prices) {
            int preSold = sold;
            sold = held + price;
            held = max(held, reset - price);
            reset = max(reset, preSold);
        }
        
        return max(sold, reset);
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 714 – Best Time to Buy and Sell Stock with Transaction Fee",
    description: "Find maximum profit with transaction fee.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
    solution: `class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int cash = 0, hold = -prices[0];
        
        for (int i = 1; i < prices.size(); i++) {
            cash = max(cash, hold + prices[i] - fee);
            hold = max(hold, cash - prices[i]);
        }
        
        return cash;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Greedy"],
  },

  // 🔹 Partition DP / MCM
  {
    title: "LC 132 – Palindrome Partitioning II",
    description: "Find minimum cuts for palindrome partitioning.",
    leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning-ii/",
    solution: `class Solution {
public:
    int minCut(string s) {
        int n = s.length();
        vector<vector<bool>> isPalin(n, vector<bool>(n, false));
        vector<int> dp(n, 0);
        
        for (int i = 0; i < n; i++) {
            int minCuts = i;
            for (int j = 0; j <= i; j++) {
                if (s[j] == s[i] && (i - j <= 1 || isPalin[j+1][i-1])) {
                    isPalin[j][i] = true;
                    minCuts = (j == 0) ? 0 : min(minCuts, dp[j-1] + 1);
                }
            }
            dp[i] = minCuts;
        }
        
        return dp[n-1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 312 – Burst Balloons",
    description: "Maximize coins by bursting balloons.",
    leetcodeUrl: "https://leetcode.com/problems/burst-balloons/",
    solution: `class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        
        vector<vector<int>> dp(n+2, vector<int>(n+2, 0));
        
        for (int len = 1; len <= n; len++) {
            for (int left = 1; left <= n - len + 1; left++) {
                int right = left + len - 1;
                for (int i = left; i <= right; i++) {
                    dp[left][right] = max(dp[left][right], 
                        nums[left-1] * nums[i] * nums[right+1] + 
                        dp[left][i-1] + dp[i+1][right]);
                }
            }
        }
        
        return dp[1][n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 1547 – Minimum Cost to Cut a Stick",
    description: "Find minimum cost to cut a stick at given positions.",
    leetcodeUrl: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
    solution: `class Solution {
public:
    int minCost(int n, vector<int>& cuts) {
        cuts.push_back(0);
        cuts.push_back(n);
        sort(cuts.begin(), cuts.end());
        
        int m = cuts.size();
        vector<vector<int>> dp(m, vector<int>(m, 0));
        
        for (int len = 2; len < m; len++) {
            for (int i = 0; i + len < m; i++) {
                int j = i + len;
                dp[i][j] = INT_MAX;
                for (int k = i + 1; k < j; k++) {
                    dp[i][j] = min(dp[i][j], 
                        dp[i][k] + dp[k][j] + cuts[j] - cuts[i]);
                }
            }
        }
        
        return dp[0][m-1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array"],
  },

  // 🔹 DP on Subsequences Advanced
  {
    title: "LC 368 – Largest Divisible Subset",
    description: "Find the largest subset where every pair is divisible.",
    leetcodeUrl: "https://leetcode.com/problems/largest-divisible-subset/",
    solution: `class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return {};
        
        sort(nums.begin(), nums.end());
        vector<int> dp(n, 1), prev(n, -1);
        int maxIdx = 0;
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] % nums[j] == 0 && dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    prev[i] = j;
                }
            }
            if (dp[i] > dp[maxIdx]) maxIdx = i;
        }
        
        vector<int> result;
        for (int i = maxIdx; i >= 0; i = prev[i]) {
            result.push_back(nums[i]);
            if (prev[i] == -1) break;
        }
        
        return result;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Math"],
  },
  {
    title: "LC 673 – Number of Longest Increasing Subsequence",
    description: "Count the number of longest increasing subsequences.",
    leetcodeUrl: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
    solution: `class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        
        vector<int> dp(n, 1), count(n, 1);
        int maxLen = 1;
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    if (dp[j] + 1 > dp[i]) {
                        dp[i] = dp[j] + 1;
                        count[i] = count[j];
                    } else if (dp[j] + 1 == dp[i]) {
                        count[i] += count[j];
                    }
                }
            }
            maxLen = max(maxLen, dp[i]);
        }
        
        int result = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == maxLen) result += count[i];
        }
        
        return result;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Binary Search"],
  },
  {
    title: "LC 139 – Word Break",
    description: "Determine if string can be segmented into dictionary words.",
    leetcodeUrl: "https://leetcode.com/problems/word-break/",
    solution: `class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        int n = s.length();
        vector<bool> dp(n + 1, false);
        dp[0] = true;
        
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dict.count(s.substr(j, i - j))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        
        return dp[n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "String", "Hash Table"],
  },
  {
    title: "LC 377 – Combination Sum IV",
    description: "Count combinations that sum to target.",
    leetcodeUrl: "https://leetcode.com/problems/combination-sum-iv/",
    solution: `class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        vector<unsigned int> dp(target + 1, 0);
        dp[0] = 1;
        
        for (int i = 1; i <= target; i++) {
            for (int num : nums) {
                if (i >= num) {
                    dp[i] += dp[i - num];
                }
            }
        }
        
        return dp[target];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },

  // 🌐 GRAPHS - Traversals
  {
    title: "LC 200 – Number of Islands",
    description: "Count the number of islands in a 2D grid.",
    leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
    solution: `class Solution {
public:
    void dfs(vector<vector<char>>& grid, int i, int j) {
        if (i < 0 || j < 0 || i >= grid.size() || j >= grid[0].size() || grid[i][j] == '0') {
            return;
        }
        
        grid[i][j] = '0';
        
        dfs(grid, i + 1, j);
        dfs(grid, i - 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i, j - 1);
    }
    
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        
        int count = 0;
        for (int i = 0; i < grid.size(); i++) {
            for (int j = 0; j < grid[0].size(); j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        
        return count;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DFS", "BFS", "Graph", "Matrix"],
  },
  {
    title: "LC 733 – Flood Fill",
    description: "Perform flood fill on an image.",
    leetcodeUrl: "https://leetcode.com/problems/flood-fill/",
    solution: `class Solution {
public:
    void dfs(vector<vector<int>>& image, int sr, int sc, int color, int oldColor) {
        if (sr < 0 || sc < 0 || sr >= image.size() || sc >= image[0].size() || 
            image[sr][sc] != oldColor) return;
        
        image[sr][sc] = color;
        
        dfs(image, sr + 1, sc, color, oldColor);
        dfs(image, sr - 1, sc, color, oldColor);
        dfs(image, sr, sc + 1, color, oldColor);
        dfs(image, sr, sc - 1, color, oldColor);
    }
    
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        if (image[sr][sc] == color) return image;
        dfs(image, sr, sc, color, image[sr][sc]);
        return image;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "EASY" as const,
    tags: ["DFS", "BFS", "Matrix"],
  },
  {
    title: "LC 130 – Surrounded Regions",
    description: "Capture all surrounded regions on a board.",
    leetcodeUrl: "https://leetcode.com/problems/surrounded-regions/",
    solution: `class Solution {
public:
    void dfs(vector<vector<char>>& board, int i, int j) {
        if (i < 0 || j < 0 || i >= board.size() || j >= board[0].size() || 
            board[i][j] != 'O') return;
        
        board[i][j] = 'T';
        dfs(board, i + 1, j);
        dfs(board, i - 1, j);
        dfs(board, i, j + 1);
        dfs(board, i, j - 1);
    }
    
    void solve(vector<vector<char>>& board) {
        if (board.empty()) return;
        
        int m = board.size(), n = board[0].size();
        
        for (int i = 0; i < m; i++) {
            dfs(board, i, 0);
            dfs(board, i, n - 1);
        }
        
        for (int j = 0; j < n; j++) {
            dfs(board, 0, j);
            dfs(board, m - 1, j);
        }
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') board[i][j] = 'X';
                if (board[i][j] == 'T') board[i][j] = 'O';
            }
        }
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DFS", "BFS", "Matrix"],
  },
  {
    title: "LC 695 – Max Area of Island",
    description: "Find the maximum area of an island in a grid.",
    leetcodeUrl: "https://leetcode.com/problems/max-area-of-island/",
    solution: `class Solution {
public:
    int dfs(vector<vector<int>>& grid, int i, int j) {
        if (i < 0 || j < 0 || i >= grid.size() || j >= grid[0].size() || grid[i][j] == 0) {
            return 0;
        }
        
        grid[i][j] = 0;
        
        return 1 + dfs(grid, i + 1, j) + dfs(grid, i - 1, j) + 
               dfs(grid, i, j + 1) + dfs(grid, i, j - 1);
    }
    
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int maxArea = 0;
        
        for (int i = 0; i < grid.size(); i++) {
            for (int j = 0; j < grid[0].size(); j++) {
                if (grid[i][j] == 1) {
                    maxArea = max(maxArea, dfs(grid, i, j));
                }
            }
        }
        
        return maxArea;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DFS", "BFS", "Matrix"],
  },

  // 🔹 BFS / Multi-source
  {
    title: "LC 994 – Rotting Oranges",
    description: "Find time for all oranges to rot.",
    leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/",
    solution: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int, int>> q;
        int fresh = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) q.push({i, j});
                if (grid[i][j] == 1) fresh++;
            }
        }
        
        int minutes = 0;
        vector<pair<int, int>> dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        
        while (!q.empty() && fresh > 0) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                auto [x, y] = q.front();
                q.pop();
                
                for (auto [dx, dy] : dirs) {
                    int nx = x + dx, ny = y + dy;
                    if (nx >= 0 && ny >= 0 && nx < m && ny < n && grid[nx][ny] == 1) {
                        grid[nx][ny] = 2;
                        q.push({nx, ny});
                        fresh--;
                    }
                }
            }
            minutes++;
        }
        
        return fresh == 0 ? minutes : -1;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["BFS", "Matrix"],
  },
  {
    title: "LC 542 – 01 Matrix",
    description: "Find distance of nearest 0 for each cell.",
    leetcodeUrl: "https://leetcode.com/problems/01-matrix/",
    solution: `class Solution {
public:
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        vector<vector<int>> dist(m, vector<int>(n, INT_MAX - 100000));
        queue<pair<int, int>> q;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) {
                    dist[i][j] = 0;
                    q.push({i, j});
                }
            }
        }
        
        vector<pair<int, int>> dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        
        while (!q.empty()) {
            auto [x, y] = q.front();
            q.pop();
            
            for (auto [dx, dy] : dirs) {
                int nx = x + dx, ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < m && ny < n) {
                    if (dist[nx][ny] > dist[x][y] + 1) {
                        dist[nx][ny] = dist[x][y] + 1;
                        q.push({nx, ny});
                    }
                }
            }
        }
        
        return dist;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["BFS", "DP", "Matrix"],
  },
  {
    title: "LC 1091 – Shortest Path in Binary Matrix",
    description: "Find shortest path in binary matrix.",
    leetcodeUrl: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
    solution: `class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        if (grid[0][0] == 1 || grid[n-1][n-1] == 1) return -1;
        
        queue<pair<int, int>> q;
        q.push({0, 0});
        grid[0][0] = 1;
        
        vector<pair<int, int>> dirs = {{0,1},{0,-1},{1,0},{-1,0},{1,1},{1,-1},{-1,1},{-1,-1}};
        int dist = 1;
        
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                auto [x, y] = q.front();
                q.pop();
                
                if (x == n-1 && y == n-1) return dist;
                
                for (auto [dx, dy] : dirs) {
                    int nx = x + dx, ny = y + dy;
                    if (nx >= 0 && ny >= 0 && nx < n && ny < n && grid[nx][ny] == 0) {
                        grid[nx][ny] = 1;
                        q.push({nx, ny});
                    }
                }
            }
            dist++;
        }
        
        return -1;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["BFS", "Matrix"],
  },

  // 🔹 Cycle Detection & Topological Sort
  {
    title: "LC 207 – Course Schedule",
    description: "Determine if all courses can be finished (detect cycle).",
    leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
    solution: `class Solution {
public:
    bool dfs(int node, vector<vector<int>>& adj, vector<int>& visited, vector<int>& recStack) {
        visited[node] = 1;
        recStack[node] = 1;
        
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                if (dfs(neighbor, adj, visited, recStack)) {
                    return true;
                }
            } else if (recStack[neighbor]) {
                return true;
            }
        }
        
        recStack[node] = 0;
        return false;
    }
    
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        
        for (auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
        }
        
        vector<int> visited(numCourses, 0);
        vector<int> recStack(numCourses, 0);
        
        for (int i = 0; i < numCourses; i++) {
            if (!visited[i]) {
                if (dfs(i, adj, visited, recStack)) {
                    return false;
                }
            }
        }
        
        return true;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DFS", "BFS", "Graph", "Topological Sort"],
  },
  {
    title: "LC 210 – Course Schedule II",
    description: "Return the ordering of courses (topological sort).",
    leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii/",
    solution: `class Solution {
public:
    bool dfs(int node, vector<vector<int>>& adj, vector<int>& visited, 
             vector<int>& recStack, stack<int>& st) {
        visited[node] = 1;
        recStack[node] = 1;
        
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                if (dfs(neighbor, adj, visited, recStack, st)) return true;
            } else if (recStack[neighbor]) {
                return true;
            }
        }
        
        recStack[node] = 0;
        st.push(node);
        return false;
    }
    
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        
        for (auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
        }
        
        vector<int> visited(numCourses, 0);
        vector<int> recStack(numCourses, 0);
        stack<int> st;
        
        for (int i = 0; i < numCourses; i++) {
            if (!visited[i]) {
                if (dfs(i, adj, visited, recStack, st)) {
                    return {};
                }
            }
        }
        
        vector<int> result;
        while (!st.empty()) {
            result.push_back(st.top());
            st.pop();
        }
        
        return result;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DFS", "BFS", "Graph", "Topological Sort"],
  },
  {
    title: "LC 802 – Find Eventual Safe States",
    description: "Find all safe nodes in a directed graph.",
    leetcodeUrl: "https://leetcode.com/problems/find-eventual-safe-states/",
    solution: `class Solution {
public:
    bool dfs(int node, vector<vector<int>>& graph, vector<int>& state) {
        if (state[node] != 0) return state[node] == 2;
        
        state[node] = 1;
        
        for (int neighbor : graph[node]) {
            if (!dfs(neighbor, graph, state)) {
                return false;
            }
        }
        
        state[node] = 2;
        return true;
    }
    
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> state(n, 0);
        vector<int> result;
        
        for (int i = 0; i < n; i++) {
            if (dfs(i, graph, state)) {
                result.push_back(i);
            }
        }
        
        return result;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DFS", "Graph", "Topological Sort"],
  },

  // 🔹 Shortest Path
  {
    title: "LC 743 – Network Delay Time",
    description: "Find time for signal to reach all nodes.",
    leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
    solution: `class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int, int>>> graph(n + 1);
        for (auto& time : times) {
            graph[time[0]].push_back({time[1], time[2]});
        }
        
        vector<int> dist(n + 1, INT_MAX);
        dist[k] = 0;
        
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        pq.push({0, k});
        
        while (!pq.empty()) {
            auto [d, node] = pq.top();
            pq.pop();
            
            if (d > dist[node]) continue;
            
            for (auto [neighbor, weight] : graph[node]) {
                if (dist[node] + weight < dist[neighbor]) {
                    dist[neighbor] = dist[node] + weight;
                    pq.push({dist[neighbor], neighbor});
                }
            }
        }
        
        int maxTime = *max_element(dist.begin() + 1, dist.end());
        return maxTime == INT_MAX ? -1 : maxTime;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["Dijkstra", "Graph", "Shortest Path"],
  },
  {
    title: "LC 787 – Cheapest Flights Within K Stops",
    description: "Find cheapest flight with at most k stops.",
    leetcodeUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    solution: `class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> dist(n, INT_MAX);
        dist[src] = 0;
        
        for (int i = 0; i <= k; i++) {
            vector<int> temp = dist;
            for (auto& flight : flights) {
                int from = flight[0], to = flight[1], price = flight[2];
                if (dist[from] != INT_MAX) {
                    temp[to] = min(temp[to], dist[from] + price);
                }
            }
            dist = temp;
        }
        
        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "BFS", "Graph", "Shortest Path"],
  },
  {
    title: "LC 1631 – Path With Minimum Effort",
    description: "Find path with minimum maximum effort.",
    leetcodeUrl: "https://leetcode.com/problems/path-with-minimum-effort/",
    solution: `class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<int>> effort(m, vector<int>(n, INT_MAX));
        effort[0][0] = 0;
        
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<>> pq;
        pq.push({0, 0, 0});
        
        vector<pair<int, int>> dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        
        while (!pq.empty()) {
            auto [eff, x, y] = pq.top();
            pq.pop();
            
            if (x == m-1 && y == n-1) return eff;
            if (eff > effort[x][y]) continue;
            
            for (auto [dx, dy] : dirs) {
                int nx = x + dx, ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < m && ny < n) {
                    int newEff = max(eff, abs(heights[nx][ny] - heights[x][y]));
                    if (newEff < effort[nx][ny]) {
                        effort[nx][ny] = newEff;
                        pq.push({newEff, nx, ny});
                    }
                }
            }
        }
        
        return 0;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["Dijkstra", "Binary Search", "Graph"],
  },

  // 🔹 Dijkstra / Weighted Graphs
  {
    title: "LC 1514 – Path with Maximum Probability",
    description: "Find path with maximum probability of success.",
    leetcodeUrl: "https://leetcode.com/problems/path-with-maximum-probability/",
    solution: `class Solution {
public:
    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start, int end) {
        vector<vector<pair<int, double>>> graph(n);
        for (int i = 0; i < edges.size(); i++) {
            graph[edges[i][0]].push_back({edges[i][1], succProb[i]});
            graph[edges[i][1]].push_back({edges[i][0], succProb[i]});
        }
        
        vector<double> prob(n, 0.0);
        prob[start] = 1.0;
        
        priority_queue<pair<double, int>> pq;
        pq.push({1.0, start});
        
        while (!pq.empty()) {
            auto [p, node] = pq.top();
            pq.pop();
            
            if (node == end) return p;
            if (p < prob[node]) continue;
            
            for (auto [neighbor, edgeProb] : graph[node]) {
                double newProb = p * edgeProb;
                if (newProb > prob[neighbor]) {
                    prob[neighbor] = newProb;
                    pq.push({newProb, neighbor});
                }
            }
        }
        
        return 0.0;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["Dijkstra", "Graph", "Shortest Path"],
  },

  // 🔹 MST
  {
    title: "LC 1584 – Min Cost to Connect All Points",
    description: "Find minimum cost to connect all points.",
    leetcodeUrl: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
    solution: `class Solution {
public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        int n = points.size();
        vector<bool> visited(n, false);
        vector<int> minCost(n, INT_MAX);
        minCost[0] = 0;
        
        int totalCost = 0;
        
        for (int i = 0; i < n; i++) {
            int u = -1;
            for (int j = 0; j < n; j++) {
                if (!visited[j] && (u == -1 || minCost[j] < minCost[u])) {
                    u = j;
                }
            }
            
            visited[u] = true;
            totalCost += minCost[u];
            
            for (int v = 0; v < n; v++) {
                if (!visited[v]) {
                    int cost = abs(points[u][0] - points[v][0]) + 
                               abs(points[u][1] - points[v][1]);
                    minCost[v] = min(minCost[v], cost);
                }
            }
        }
        
        return totalCost;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["MST", "Union Find", "Graph"],
  },

  // 🔹 Union Find / DSU
  {
    title: "LC 547 – Number of Provinces",
    description: "Find number of connected components (provinces).",
    leetcodeUrl: "https://leetcode.com/problems/number-of-provinces/",
    solution: `class Solution {
public:
    int find(int x, vector<int>& parent) {
        if (parent[x] != x) {
            parent[x] = find(parent[x], parent);
        }
        return parent[x];
    }
    
    void unite(int x, int y, vector<int>& parent, vector<int>& rank) {
        int px = find(x, parent);
        int py = find(y, parent);
        
        if (px == py) return;
        
        if (rank[px] < rank[py]) {
            parent[px] = py;
        } else if (rank[px] > rank[py]) {
            parent[py] = px;
        } else {
            parent[py] = px;
            rank[px]++;
        }
    }
    
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        vector<int> parent(n), rank(n, 0);
        
        for (int i = 0; i < n; i++) parent[i] = i;
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isConnected[i][j] == 1) {
                    unite(i, j, parent, rank);
                }
            }
        }
        
        int provinces = 0;
        for (int i = 0; i < n; i++) {
            if (parent[i] == i) provinces++;
        }
        
        return provinces;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DFS", "BFS", "Union Find", "Graph"],
  },
  {
    title: "LC 684 – Redundant Connection",
    description: "Find edge that creates a cycle.",
    leetcodeUrl: "https://leetcode.com/problems/redundant-connection/",
    solution: `class Solution {
public:
    int find(int x, vector<int>& parent) {
        if (parent[x] != x) {
            parent[x] = find(parent[x], parent);
        }
        return parent[x];
    }
    
    bool unite(int x, int y, vector<int>& parent, vector<int>& rank) {
        int px = find(x, parent);
        int py = find(y, parent);
        
        if (px == py) return false;
        
        if (rank[px] < rank[py]) {
            parent[px] = py;
        } else if (rank[px] > rank[py]) {
            parent[py] = px;
        } else {
            parent[py] = px;
            rank[px]++;
        }
        
        return true;
    }
    
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> parent(n + 1), rank(n + 1, 0);
        
        for (int i = 0; i <= n; i++) parent[i] = i;
        
        for (auto& edge : edges) {
            if (!unite(edge[0], edge[1], parent, rank)) {
                return edge;
            }
        }
        
        return {};
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DFS", "BFS", "Union Find", "Graph"],
  },
  {
    title: "LC 1319 – Number of Operations to Make Network Connected",
    description: "Find minimum operations to connect network.",
    leetcodeUrl: "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
    solution: `class Solution {
public:
    int find(int x, vector<int>& parent) {
        if (parent[x] != x) {
            parent[x] = find(parent[x], parent);
        }
        return parent[x];
    }
    
    void unite(int x, int y, vector<int>& parent) {
        parent[find(x, parent)] = find(y, parent);
    }
    
    int makeConnected(int n, vector<vector<int>>& connections) {
        if (connections.size() < n - 1) return -1;
        
        vector<int> parent(n);
        for (int i = 0; i < n; i++) parent[i] = i;
        
        for (auto& conn : connections) {
            unite(conn[0], conn[1], parent);
        }
        
        int components = 0;
        for (int i = 0; i < n; i++) {
            if (parent[i] == i) components++;
        }
        
        return components - 1;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DFS", "BFS", "Union Find"],
  },
  {
    title: "LC 721 – Accounts Merge",
    description: "Merge accounts with common emails.",
    leetcodeUrl: "https://leetcode.com/problems/accounts-merge/",
    solution: `class Solution {
public:
    int find(int x, vector<int>& parent) {
        if (parent[x] != x) {
            parent[x] = find(parent[x], parent);
        }
        return parent[x];
    }
    
    void unite(int x, int y, vector<int>& parent) {
        parent[find(x, parent)] = find(y, parent);
    }
    
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int n = accounts.size();
        vector<int> parent(n);
        for (int i = 0; i < n; i++) parent[i] = i;
        
        unordered_map<string, int> emailToId;
        
        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts[i].size(); j++) {
                string email = accounts[i][j];
                if (emailToId.find(email) == emailToId.end()) {
                    emailToId[email] = i;
                } else {
                    unite(i, emailToId[email], parent);
                }
            }
        }
        
        unordered_map<int, set<string>> merged;
        for (auto& [email, id] : emailToId) {
            merged[find(id, parent)].insert(email);
        }
        
        vector<vector<string>> result;
        for (auto& [id, emails] : merged) {
            vector<string> account = {accounts[id][0]};
            account.insert(account.end(), emails.begin(), emails.end());
            result.push_back(account);
        }
        
        return result;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DFS", "BFS", "Union Find"],
  },

  // 🔹 Bridges / Critical Connections
  {
    title: "LC 1192 – Critical Connections in a Network",
    description: "Find all bridges in a network.",
    leetcodeUrl: "https://leetcode.com/problems/critical-connections-in-a-network/",
    solution: `class Solution {
public:
    int timer = 0;
    
    void dfs(int node, int parent, vector<vector<int>>& graph, vector<int>& disc, 
             vector<int>& low, vector<vector<int>>& result) {
        disc[node] = low[node] = timer++;
        
        for (int neighbor : graph[node]) {
            if (neighbor == parent) continue;
            
            if (disc[neighbor] == -1) {
                dfs(neighbor, node, graph, disc, low, result);
                low[node] = min(low[node], low[neighbor]);
                
                if (low[neighbor] > disc[node]) {
                    result.push_back({node, neighbor});
                }
            } else {
                low[node] = min(low[node], disc[neighbor]);
            }
        }
    }
    
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        vector<vector<int>> graph(n);
        for (auto& conn : connections) {
            graph[conn[0]].push_back(conn[1]);
            graph[conn[1]].push_back(conn[0]);
        }
        
        vector<int> disc(n, -1), low(n, -1);
        vector<vector<int>> result;
        
        dfs(0, -1, graph, disc, low, result);
        
        return result;
    }
};`,
    category: "GRAPH" as const,
    difficulty: "HARD" as const,
    tags: ["DFS", "Graph", "Bridges"],
  },
]

async function seed() {
  console.log('🌱 Starting seed...')

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing problems...')
    await db.delete(problems)

    // Insert new data
    console.log('📝 Inserting problems...')
    await db.insert(problems).values(problemsData)

    console.log('✅ Seed completed successfully!')
    console.log(`📊 Inserted ${problemsData.length} problems`)
  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  } finally {
    await client.end()
  }
}

seed()
