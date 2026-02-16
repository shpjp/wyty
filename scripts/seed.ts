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
    constraints: [
      "0 <= n <= 30"
    ],
    solutionRecursion: `class Solution {
public:
    int fib(int n) {
        // Base cases
        if (n <= 1) return n;
        
        // Recursive calls
        return fib(n - 1) + fib(n - 2);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int fibHelper(int n, vector<int>& dp) {
        // Base cases
        if (n <= 1) return n;
        
        // Return if already computed
        if (dp[n] != -1) return dp[n];
        
        // Store and return result
        return dp[n] = fibHelper(n - 1, dp) + fibHelper(n - 2, dp);
    }
    
    int fib(int n) {
        vector<int> dp(n + 1, -1);
        return fibHelper(n, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        
        vector<int> dp(n + 1);
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
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
    constraints: [
      "1 <= n <= 45"
    ],
    solutionRecursion: `class Solution {
public:
    int climbStairs(int n) {
        // Base cases
        if (n <= 2) return n;
        
        // Recursive calls
        return climbStairs(n - 1) + climbStairs(n - 2);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int climbHelper(int n, vector<int>& dp) {
        // Base cases
        if (n <= 2) return n;
        
        // Return if already computed
        if (dp[n] != -1) return dp[n];
        
        // Store and return result
        return dp[n] = climbHelper(n - 1, dp) + climbHelper(n - 2, dp);
    }
    
    int climbStairs(int n) {
        vector<int> dp(n + 1, -1);
        return climbHelper(n, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        
        vector<int> dp(n + 1);
        dp[1] = 1;
        dp[2] = 2;
        
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
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
    constraints: [
      "2 <= cost.length <= 1000",
      "0 <= cost[i] <= 999"
    ],
    solutionRecursion: `class Solution {
public:
    int minCost(vector<int>& cost, int n) {
        // Base cases
        if (n < 0) return 0;
        if (n == 0 || n == 1) return cost[n];
        
        // Recursive calls
        return cost[n] + min(minCost(cost, n - 1), minCost(cost, n - 2));
    }
    
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        return min(minCost(cost, n - 1), minCost(cost, n - 2));
    }
};`,
    solutionMemoization: `class Solution {
public:
    int minCostHelper(vector<int>& cost, int n, vector<int>& dp) {
        // Base cases
        if (n < 0) return 0;
        if (n == 0 || n == 1) return cost[n];
        
        // Return if already computed
        if (dp[n] != -1) return dp[n];
        
        // Store and return result
        return dp[n] = cost[n] + min(minCostHelper(cost, n - 1, dp), 
                                      minCostHelper(cost, n - 2, dp));
    }
    
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        vector<int> dp(n, -1);
        return min(minCostHelper(cost, n - 1, dp), 
                   minCostHelper(cost, n - 2, dp));
    }
};`,
    solutionTabulation: `class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        vector<int> dp(n);
        dp[0] = cost[0];
        dp[1] = cost[1];
        
        for (int i = 2; i < n; i++) {
            dp[i] = cost[i] + min(dp[i - 1], dp[i - 2]);
        }
        
        return min(dp[n - 1], dp[n - 2]);
    }
};`,
    solutionSpaceOptimized: `class Solution {
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
    constraints: [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 400"
    ],
    solutionRecursion: `class Solution {
public:
    int robHelper(vector<int>& nums, int idx) {
        // Base cases
        if (idx >= nums.size()) return 0;
        
        // Either rob current house or skip it
        int rob = nums[idx] + robHelper(nums, idx + 2);
        int skip = robHelper(nums, idx + 1);
        
        return max(rob, skip);
    }
    
    int rob(vector<int>& nums) {
        return robHelper(nums, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int robHelper(vector<int>& nums, int idx, vector<int>& dp) {
        // Base cases
        if (idx >= nums.size()) return 0;
        
        // Return if already computed
        if (dp[idx] != -1) return dp[idx];
        
        // Either rob current house or skip it
        int rob = nums[idx] + robHelper(nums, idx + 2, dp);
        int skip = robHelper(nums, idx + 1, dp);
        
        return dp[idx] = max(rob, skip);
    }
    
    int rob(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, -1);
        return robHelper(nums, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        if (n == 1) return nums[0];
        
        vector<int> dp(n);
        dp[0] = nums[0];
        dp[1] = max(nums[0], nums[1]);
        
        for (int i = 2; i < n; i++) {
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        
        return dp[n - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
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
    constraints: [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 1000"
    ],
    solutionRecursion: `class Solution {
public:
    int robHelper(vector<int>& nums, int start, int end) {
        if (start > end) return 0;
        if (start == end) return nums[start];
        
        int rob = nums[start] + robHelper(nums, start + 2, end);
        int skip = robHelper(nums, start + 1, end);
        
        return max(rob, skip);
    }
    
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        
        // Either exclude first house or exclude last house
        return max(robHelper(nums, 0, n - 2), robHelper(nums, 1, n - 1));
    }
};`,
    solutionMemoization: `class Solution {
public:
    int robHelper(vector<int>& nums, int start, int end, vector<int>& dp) {
        if (start > end) return 0;
        if (start == end) return nums[start];
        
        if (dp[start] != -1) return dp[start];
        
        int rob = nums[start] + robHelper(nums, start + 2, end, dp);
        int skip = robHelper(nums, start + 1, end, dp);
        
        return dp[start] = max(rob, skip);
    }
    
    int robLinear(vector<int>& nums, int start, int end) {
        vector<int> dp(nums.size(), -1);
        return robHelper(nums, start, end, dp);
    }
    
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        
        return max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
    }
};`,
    solutionTabulation: `class Solution {
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
        if (n == 2) return max(nums[0], nums[1]);
        
        return max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
    }
};`,
    solutionSpaceOptimized: `class Solution {
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
        return max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
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
    constraints: [
      "1 <= nums.length <= 2 * 10^4",
      "1 <= nums[i] <= 10^4"
    ],
    solutionRecursion: `class Solution {
public:
    int earnHelper(vector<int>& points, int idx) {
        if (idx >= points.size()) return 0;
        
        int earn = points[idx] + earnHelper(points, idx + 2);
        int skip = earnHelper(points, idx + 1);
        
        return max(earn, skip);
    }
    
    int deleteAndEarn(vector<int>& nums) {
        int maxNum = *max_element(nums.begin(), nums.end());
        vector<int> points(maxNum + 1, 0);
        
        for (int num : nums) {
            points[num] += num;
        }
        
        return earnHelper(points, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int earnHelper(vector<int>& points, int idx, vector<int>& dp) {
        if (idx >= points.size()) return 0;
        
        if (dp[idx] != -1) return dp[idx];
        
        int earn = points[idx] + earnHelper(points, idx + 2, dp);
        int skip = earnHelper(points, idx + 1, dp);
        
        return dp[idx] = max(earn, skip);
    }
    
    int deleteAndEarn(vector<int>& nums) {
        int maxNum = *max_element(nums.begin(), nums.end());
        vector<int> points(maxNum + 1, 0);
        
        for (int num : nums) {
            points[num] += num;
        }
        
        vector<int> dp(points.size(), -1);
        return earnHelper(points, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        int maxNum = *max_element(nums.begin(), nums.end());
        vector<int> points(maxNum + 1, 0);
        
        for (int num : nums) {
            points[num] += num;
        }
        
        vector<int> dp(points.size());
        dp[0] = points[0];
        if (points.size() > 1) {
            dp[1] = max(points[0], points[1]);
        }
        
        for (int i = 2; i < points.size(); i++) {
            dp[i] = max(dp[i - 1], dp[i - 2] + points[i]);
        }
        
        return dp[points.size() - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
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
    constraints: [
      "1 <= s.length <= 100",
      "s contains only digits and may contain leading zero(s)."
    ],
    solutionRecursion: `class Solution {
public:
    int decodeHelper(string& s, int idx) {
        if (idx == s.length()) return 1;
        if (s[idx] == '0') return 0;
        
        int ways = decodeHelper(s, idx + 1);
        
        if (idx + 1 < s.length()) {
            int twoDigit = stoi(s.substr(idx, 2));
            if (twoDigit <= 26) {
                ways += decodeHelper(s, idx + 2);
            }
        }
        
        return ways;
    }
    
    int numDecodings(string s) {
        return decodeHelper(s, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int decodeHelper(string& s, int idx, vector<int>& dp) {
        if (idx == s.length()) return 1;
        if (s[idx] == '0') return 0;
        
        if (dp[idx] != -1) return dp[idx];
        
        int ways = decodeHelper(s, idx + 1, dp);
        
        if (idx + 1 < s.length()) {
            int twoDigit = stoi(s.substr(idx, 2));
            if (twoDigit <= 26) {
                ways += decodeHelper(s, idx + 2, dp);
            }
        }
        
        return dp[idx] = ways;
    }
    
    int numDecodings(string s) {
        int n = s.length();
        vector<int> dp(n, -1);
        return decodeHelper(s, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int numDecodings(string s) {
        int n = s.length();
        if (n == 0 || s[0] == '0') return 0;
        
        vector<int> dp(n + 1);
        dp[n] = 1;
        dp[n - 1] = s[n - 1] != '0' ? 1 : 0;
        
        for (int i = n - 2; i >= 0; i--) {
            if (s[i] == '0') {
                dp[i] = 0;
            } else {
                dp[i] = dp[i + 1];
                int twoDigit = stoi(s.substr(i, 2));
                if (twoDigit <= 26) {
                    dp[i] += dp[i + 2];
                }
            }
        }
        
        return dp[0];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int numDecodings(string s) {
        int n = s.length();
        if (n == 0 || s[0] == '0') return 0;
        
        int prev2 = 1, prev1 = 1;
        
        for (int i = 1; i < n; i++) {
            int current = 0;
            if (s[i] != '0') current = prev1;
            
            int twoDigit = stoi(s.substr(i - 1, 2));
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
    constraints: [
      "1 <= m, n <= 100"
    ],
    solutionRecursion: `class Solution {
public:
    int pathHelper(int i, int j, int m, int n) {
        if (i == m - 1 && j == n - 1) return 1;
        if (i >= m || j >= n) return 0;
        
        int down = pathHelper(i + 1, j, m, n);
        int right = pathHelper(i, j + 1, m, n);
        
        return down + right;
    }
    
    int uniquePaths(int m, int n) {
        return pathHelper(0, 0, m, n);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int pathHelper(int i, int j, int m, int n, vector<vector<int>>& dp) {
        if (i == m - 1 && j == n - 1) return 1;
        if (i >= m || j >= n) return 0;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        int down = pathHelper(i + 1, j, m, n, dp);
        int right = pathHelper(i, j + 1, m, n, dp);
        
        return dp[i][j] = down + right;
    }
    
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return pathHelper(0, 0, m, n, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m, vector<int>(n, 1));
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        
        return dp[m - 1][n - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> prev(n, 1);
        
        for (int i = 1; i < m; i++) {
            vector<int> curr(n, 1);
            for (int j = 1; j < n; j++) {
                curr[j] = curr[j - 1] + prev[j];
            }
            prev = curr;
        }
        
        return prev[n - 1];
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
    constraints: [
      "m == obstacleGrid.length",
      "n == obstacleGrid[i].length",
      "1 <= m, n <= 100",
      "obstacleGrid[i][j] is 0 or 1."
    ],
    solutionRecursion: `class Solution {
public:
    int pathHelper(vector<vector<int>>& grid, int i, int j) {
        if (i >= grid.size() || j >= grid[0].size() || grid[i][j] == 1) return 0;
        if (i == grid.size() - 1 && j == grid[0].size() - 1) return 1;
        
        int down = pathHelper(grid, i + 1, j);
        int right = pathHelper(grid, i, j + 1);
        
        return down + right;
    }
    
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        return pathHelper(grid, 0, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int pathHelper(vector<vector<int>>& grid, int i, int j, vector<vector<int>>& dp) {
        if (i >= grid.size() || j >= grid[0].size() || grid[i][j] == 1) return 0;
        if (i == grid.size() - 1 && j == grid[0].size() - 1) return 1;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        int down = pathHelper(grid, i + 1, j, dp);
        int right = pathHelper(grid, i, j + 1, dp);
        
        return dp[i][j] = down + right;
    }
    
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return pathHelper(grid, 0, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
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
                } else if (i == 0 && j == 0) {
                    continue;
                } else {
                    if (i > 0) dp[i][j] += dp[i - 1][j];
                    if (j > 0) dp[i][j] += dp[i][j - 1];
                }
            }
        }
        
        return dp[m - 1][n - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        if (grid[0][0] == 1) return 0;
        
        vector<int> prev(n, 0);
        
        for (int i = 0; i < m; i++) {
            vector<int> curr(n, 0);
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    curr[j] = 0;
                } else if (i == 0 && j == 0) {
                    curr[j] = 1;
                } else {
                    if (i > 0) curr[j] += prev[j];
                    if (j > 0) curr[j] += curr[j - 1];
                }
            }
            prev = curr;
        }
        
        return prev[n - 1];
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
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 200",
      "0 <= grid[i][j] <= 200"
    ],
    solutionRecursion: `class Solution {
public:
    int pathHelper(vector<vector<int>>& grid, int i, int j) {
        if (i >= grid.size() || j >= grid[0].size()) return INT_MAX;
        if (i == grid.size() - 1 && j == grid[0].size() - 1) return grid[i][j];
        
        int down = pathHelper(grid, i + 1, j);
        int right = pathHelper(grid, i, j + 1);
        
        return grid[i][j] + min(down, right);
    }
    
    int minPathSum(vector<vector<int>>& grid) {
        return pathHelper(grid, 0, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int pathHelper(vector<vector<int>>& grid, int i, int j, vector<vector<int>>& dp) {
        if (i >= grid.size() || j >= grid[0].size()) return INT_MAX;
        if (i == grid.size() - 1 && j == grid[0].size() - 1) return grid[i][j];
        
        if (dp[i][j] != -1) return dp[i][j];
        
        int down = pathHelper(grid, i + 1, j, dp);
        int right = pathHelper(grid, i, j + 1, dp);
        
        return dp[i][j] = grid[i][j] + min(down, right);
    }
    
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return pathHelper(grid, 0, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));
        dp[0][0] = grid[0][0];
        
        for (int i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];
        for (int j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = grid[i][j] + min(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        
        return dp[m - 1][n - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> prev(n);
        
        for (int i = 0; i < m; i++) {
            vector<int> curr(n);
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) {
                    curr[j] = grid[i][j];
                } else {
                    int up = (i > 0) ? prev[j] : INT_MAX;
                    int left = (j > 0) ? curr[j - 1] : INT_MAX;
                    curr[j] = grid[i][j] + min(up, left);
                }
            }
            prev = curr;
        }
        
        return prev[n - 1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Matrix"],
  },
  {
    title: "LC 1137 – N-th Tribonacci Number",
    description: "Calculate the nth Tribonacci number where T(n) = T(n-1) + T(n-2) + T(n-3).",
    leetcodeUrl: "https://leetcode.com/problems/n-th-tribonacci-number/",
    constraints: ["0 <= n <= 37"],
    solutionRecursion: `class Solution {
public:
    int tribonacci(int n) {
        if (n == 0) return 0;
        if (n == 1 || n == 2) return 1;
        
        return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int tribHelper(int n, vector<int>& dp) {
        if (n == 0) return 0;
        if (n == 1 || n == 2) return 1;
        
        if (dp[n] != -1) return dp[n];
        
        return dp[n] = tribHelper(n - 1, dp) + tribHelper(n - 2, dp) + tribHelper(n - 3, dp);
    }
    
    int tribonacci(int n) {
        vector<int> dp(n + 1, -1);
        return tribHelper(n, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int tribonacci(int n) {
        if (n == 0) return 0;
        if (n == 1 || n == 2) return 1;
        
        vector<int> dp(n + 1);
        dp[0] = 0; dp[1] = 1; dp[2] = 1;
        
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
        }
        
        return dp[n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int tribonacci(int n) {
        if (n == 0) return 0;
        if (n == 1 || n == 2) return 1;
        
        int a = 0, b = 1, c = 1;
        
        for (int i = 3; i <= n; i++) {
            int temp = a + b + c;
            a = b;
            b = c;
            c = temp;
        }
        
        return c;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "EASY" as const,
    tags: ["DP", "Math"],
  },

  // 🔹 Grid DP (continued)
  {
    title: "LC 120 – Triangle",
    description: "Find the minimum path sum from top to bottom in a triangle.",
    leetcodeUrl: "https://leetcode.com/problems/triangle/",
    constraints: ["1 <= triangle.length <= 200", "-10^4 <= triangle[i][j] <= 10^4"],
    solutionRecursion: `class Solution {
public:
    int pathHelper(vector<vector<int>>& triangle, int i, int j) {
        if (i == triangle.size()) return 0;
        
        int down = pathHelper(triangle, i + 1, j);
        int diagonal = pathHelper(triangle, i + 1, j + 1);
        
        return triangle[i][j] + min(down, diagonal);
    }
    
    int minimumTotal(vector<vector<int>>& triangle) {
        return pathHelper(triangle, 0, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int pathHelper(vector<vector<int>>& triangle, int i, int j, vector<vector<int>>& dp) {
        if (i == triangle.size()) return 0;
        
        if (dp[i][j] != INT_MAX) return dp[i][j];
        
        int down = pathHelper(triangle, i + 1, j, dp);
        int diagonal = pathHelper(triangle, i + 1, j + 1, dp);
        
        return dp[i][j] = triangle[i][j] + min(down, diagonal);
    }
    
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<vector<int>> dp(n, vector<int>(n, INT_MAX));
        return pathHelper(triangle, 0, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<vector<int>> dp(n, vector<int>(n));
        
        for (int j = 0; j < n; j++) {
            dp[n - 1][j] = triangle[n - 1][j];
        }
        
        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[i][j] = triangle[i][j] + min(dp[i + 1][j], dp[i + 1][j + 1]);
            }
        }
        
        return dp[0][0];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> prev(n);
        
        for (int j = 0; j < n; j++) {
            prev[j] = triangle[n - 1][j];
        }
        
        for (int i = n - 2; i >= 0; i--) {
            vector<int> curr(n);
            for (int j = 0; j <= i; j++) {
                curr[j] = triangle[i][j] + min(prev[j], prev[j + 1]);
            }
            prev = curr;
        }
        
        return prev[0];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 931 – Minimum Falling Path Sum",
    description: "Find the minimum falling path sum through a matrix.",
    leetcodeUrl: "https://leetcode.com/problems/minimum-falling-path-sum/",
    constraints: ["n == matrix.length == matrix[i].length", "1 <= n <= 100", "-100 <= matrix[i][j] <= 100"],
    solutionRecursion: `class Solution {
public:
    int pathHelper(vector<vector<int>>& matrix, int i, int j) {
        if (j < 0 || j >= matrix[0].size()) return INT_MAX;
        if (i == 0) return matrix[i][j];
        
        int up = pathHelper(matrix, i - 1, j);
        int upLeft = pathHelper(matrix, i - 1, j - 1);
        int upRight = pathHelper(matrix, i - 1, j + 1);
        
        return matrix[i][j] + min({up, upLeft, upRight});
    }
    
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        int minPath = INT_MAX;
        
        for (int j = 0; j < n; j++) {
            minPath = min(minPath, pathHelper(matrix, n - 1, j));
        }
        
        return minPath;
    }
};`,
    solutionMemoization: `class Solution {
public:
    int pathHelper(vector<vector<int>>& matrix, int i, int j, vector<vector<int>>& dp) {
        if (j < 0 || j >= matrix[0].size()) return INT_MAX;
        if (i == 0) return matrix[i][j];
        
        if (dp[i][j] != INT_MAX) return dp[i][j];
        
        int up = pathHelper(matrix, i - 1, j, dp);
        int upLeft = pathHelper(matrix, i - 1, j - 1, dp);
        int upRight = pathHelper(matrix, i - 1, j + 1, dp);
        
        return dp[i][j] = matrix[i][j] + min({up, upLeft, upRight});
    }
    
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<vector<int>> dp(n, vector<int>(n, INT_MAX));
        int minPath = INT_MAX;
        
        for (int j = 0; j < n; j++) {
            minPath = min(minPath, pathHelper(matrix, n - 1, j, dp));
        }
        
        return minPath;
    }
};`,
    solutionTabulation: `class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<vector<int>> dp(n, vector<int>(n));
        
        for (int j = 0; j < n; j++) {
            dp[0][j] = matrix[0][j];
        }
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < n; j++) {
                int up = dp[i - 1][j];
                int upLeft = (j > 0) ? dp[i - 1][j - 1] : INT_MAX;
                int upRight = (j < n - 1) ? dp[i - 1][j + 1] : INT_MAX;
                
                dp[i][j] = matrix[i][j] + min({up, upLeft, upRight});
            }
        }
        
        return *min_element(dp[n - 1].begin(), dp[n - 1].end());
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<int> prev(n);
        
        for (int j = 0; j < n; j++) {
            prev[j] = matrix[0][j];
        }
        
        for (int i = 1; i < n; i++) {
            vector<int> curr(n);
            for (int j = 0; j < n; j++) {
                int up = prev[j];
                int upLeft = (j > 0) ? prev[j - 1] : INT_MAX;
                int upRight = (j < n - 1) ? prev[j + 1] : INT_MAX;
                
                curr[j] = matrix[i][j] + min({up, upLeft, upRight});
            }
            prev = curr;
        }
        
        return *min_element(prev.begin(), prev.end());
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Matrix"],
  },
  {
    title: "LC 300 – Longest Increasing Subsequence",
    description: "Find the length of the longest strictly increasing subsequence.",
    leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    solutionRecursion: `class Solution {
public:
    int lisHelper(vector<int>& nums, int idx, int prevIdx) {
        if (idx == nums.size()) return 0;
        
        int notTake = lisHelper(nums, idx + 1, prevIdx);
        int take = 0;
        if (prevIdx == -1 || nums[idx] > nums[prevIdx]) {
            take = 1 + lisHelper(nums, idx + 1, idx);
        }
        
        return max(take, notTake);
    }
    
    int lengthOfLIS(vector<int>& nums) {
        return lisHelper(nums, 0, -1);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int lisHelper(vector<int>& nums, int idx, int prevIdx, vector<vector<int>>& dp) {
        if (idx == nums.size()) return 0;
        
        if (dp[idx][prevIdx + 1] != -1) return dp[idx][prevIdx + 1];
        
        int notTake = lisHelper(nums, idx + 1, prevIdx, dp);
        int take = 0;
        if (prevIdx == -1 || nums[idx] > nums[prevIdx]) {
            take = 1 + lisHelper(nums, idx + 1, idx, dp);
        }
        
        return dp[idx][prevIdx + 1] = max(take, notTake);
    }
    
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(n + 1, -1));
        return lisHelper(nums, 0, -1, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, 1);
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
        }
        
        return *max_element(dp.begin(), dp.end());
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> lis;
        
        for (int num : nums) {
            auto it = lower_bound(lis.begin(), lis.end(), num);
            if (it == lis.end()) {
                lis.push_back(num);
            } else {
                *it = num;
            }
        }
        
        return lis.size();
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Binary Search"],
  },
  {
    title: "LC 1143 – Longest Common Subsequence",
    description: "Find the length of the longest common subsequence between two strings.",
    leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
    constraints: ["1 <= text1.length, text2.length <= 1000", "text1 and text2 consist of only lowercase English characters."],
    solutionRecursion: `class Solution {
public:
    int lcsHelper(string& s1, string& s2, int i, int j) {
        if (i < 0 || j < 0) return 0;
        
        if (s1[i] == s2[j]) {
            return 1 + lcsHelper(s1, s2, i - 1, j - 1);
        }
        
        return max(lcsHelper(s1, s2, i - 1, j), lcsHelper(s1, s2, i, j - 1));
    }
    
    int longestCommonSubsequence(string text1, string text2) {
        return lcsHelper(text1, text2, text1.length() - 1, text2.length() - 1);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int lcsHelper(string& s1, string& s2, int i, int j, vector<vector<int>>& dp) {
        if (i < 0 || j < 0) return 0;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        if (s1[i] == s2[j]) {
            return dp[i][j] = 1 + lcsHelper(s1, s2, i - 1, j - 1, dp);
        }
        
        return dp[i][j] = max(lcsHelper(s1, s2, i - 1, j, dp), lcsHelper(s1, s2, i, j - 1, dp));
    }
    
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.length(), n = text2.length();
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return lcsHelper(text1, text2, m - 1, n - 1, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.length(), n = text2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[m][n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.length(), n = text2.length();
        vector<int> prev(n + 1, 0);
        
        for (int i = 1; i <= m; i++) {
            vector<int> curr(n + 1, 0);
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    curr[j] = 1 + prev[j - 1];
                } else {
                    curr[j] = max(prev[j], curr[j - 1]);
                }
            }
            prev = curr;
        }
        
        return prev[n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 72 – Edit Distance",
    description: "Find minimum edit distance to convert one string to another.",
    leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
    constraints: ["0 <= word1.length, word2.length <= 500", "word1 and word2 consist of lowercase English letters."],
    solutionRecursion: `class Solution {
public:
    int editHelper(string& s1, string& s2, int i, int j) {
        if (i < 0) return j + 1;
        if (j < 0) return i + 1;
        
        if (s1[i] == s2[j]) {
            return editHelper(s1, s2, i - 1, j - 1);
        }
        
        int insert = 1 + editHelper(s1, s2, i, j - 1);
        int del = 1 + editHelper(s1, s2, i - 1, j);
        int replace = 1 + editHelper(s1, s2, i - 1, j - 1);
        
        return min({insert, del, replace});
    }
    
    int minDistance(string word1, string word2) {
        return editHelper(word1, word2, word1.length() - 1, word2.length() - 1);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int editHelper(string& s1, string& s2, int i, int j, vector<vector<int>>& dp) {
        if (i < 0) return j + 1;
        if (j < 0) return i + 1;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        if (s1[i] == s2[j]) {
            return dp[i][j] = editHelper(s1, s2, i - 1, j - 1, dp);
        }
        
        int insert = 1 + editHelper(s1, s2, i, j - 1, dp);
        int del = 1 + editHelper(s1, s2, i - 1, j, dp);
        int replace = 1 + editHelper(s1, s2, i - 1, j - 1, dp);
        
        return dp[i][j] = min({insert, del, replace});
    }
    
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return editHelper(word1, word2, m - 1, n - 1, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]});
                }
            }
        }
        
        return dp[m][n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<int> prev(n + 1);
        
        for (int j = 0; j <= n; j++) prev[j] = j;
        
        for (int i = 1; i <= m; i++) {
            vector<int> curr(n + 1);
            curr[0] = i;
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    curr[j] = prev[j - 1];
                } else {
                    curr[j] = 1 + min({curr[j - 1], prev[j], prev[j - 1]});
                }
            }
            prev = curr;
        }
        
        return prev[n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 322 – Coin Change",
    description: "Find the minimum number of coins needed to make up an amount.",
    leetcodeUrl: "https://leetcode.com/problems/coin-change/",
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    solutionRecursion: `class Solution {
public:
    int coinHelper(vector<int>& coins, int amount) {
        if (amount == 0) return 0;
        if (amount < 0) return INT_MAX;
        
        int minCoins = INT_MAX;
        for (int coin : coins) {
            int res = coinHelper(coins, amount - coin);
            if (res != INT_MAX) {
                minCoins = min(minCoins, res + 1);
            }
        }
        
        return minCoins;
    }
    
    int coinChange(vector<int>& coins, int amount) {
        int result = coinHelper(coins, amount);
        return result == INT_MAX ? -1 : result;
    }
};`,
    solutionMemoization: `class Solution {
public:
    int coinHelper(vector<int>& coins, int amount, vector<int>& dp) {
        if (amount == 0) return 0;
        if (amount < 0) return INT_MAX;
        
        if (dp[amount] != -1) return dp[amount];
        
        int minCoins = INT_MAX;
        for (int coin : coins) {
            int res = coinHelper(coins, amount - coin, dp);
            if (res != INT_MAX) {
                minCoins = min(minCoins, res + 1);
            }
        }
        
        return dp[amount] = minCoins;
    }
    
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, -1);
        int result = coinHelper(coins, amount, dp);
        return result == INT_MAX ? -1 : result;
    }
};`,
    solutionTabulation: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, INT_MAX);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i >= coin && dp[i - coin] != INT_MAX) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        return dp[amount] == INT_MAX ? -1 : dp[amount];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, INT_MAX);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i >= coin && dp[i - coin] != INT_MAX) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        return dp[amount] == INT_MAX ? -1 : dp[amount];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "BFS"],
  },
  {
    title: "LC 121 – Best Time to Buy and Sell Stock",
    description: "Find maximum profit from buying and selling stock once.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    solutionRecursion: `class Solution {
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
    solutionMemoization: `class Solution {
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
    solutionTabulation: `class Solution {
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
    solutionSpaceOptimized: `class Solution {
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
    title: "LC 139 – Word Break",
    description: "Determine if a string can be segmented into words from a dictionary.",
    leetcodeUrl: "https://leetcode.com/problems/word-break/",
    constraints: ["1 <= s.length <= 300", "1 <= wordDict.length <= 1000", "1 <= wordDict[i].length <= 20"],
    solutionRecursion: `class Solution {
public:
    bool wordBreakHelper(string& s, unordered_set<string>& dict, int start) {
        if (start == s.length()) return true;
        
        for (int end = start + 1; end <= s.length(); end++) {
            string word = s.substr(start, end - start);
            if (dict.count(word) && wordBreakHelper(s, dict, end)) {
                return true;
            }
        }
        
        return false;
    }
    
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        return wordBreakHelper(s, dict, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    bool wordBreakHelper(string& s, unordered_set<string>& dict, int start, vector<int>& dp) {
        if (start == s.length()) return true;
        
        if (dp[start] != -1) return dp[start];
        
        for (int end = start + 1; end <= s.length(); end++) {
            string word = s.substr(start, end - start);
            if (dict.count(word) && wordBreakHelper(s, dict, end, dp)) {
                return dp[start] = true;
            }
        }
        
        return dp[start] = false;
    }
    
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        vector<int> dp(s.length(), -1);
        return wordBreakHelper(s, dict, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
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
    solutionSpaceOptimized: `class Solution {
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
    title: "LC 221 – Maximal Square",
    description: "Find the largest square containing only 1's in a binary matrix.",
    leetcodeUrl: "https://leetcode.com/problems/maximal-square/",
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 300"],
    solutionRecursion: `class Solution {
public:
    int maxSquareHelper(vector<vector<char>>& matrix, int i, int j) {
        if (i >= matrix.size() || j >= matrix[0].size() || matrix[i][j] == '0') return 0;
        
        int right = maxSquareHelper(matrix, i, j + 1);
        int down = maxSquareHelper(matrix, i + 1, j);
        int diag = maxSquareHelper(matrix, i + 1, j + 1);
        
        return 1 + min({right, down, diag});
    }
    
    int maximalSquare(vector<vector<char>>& matrix) {
        int maxSide = 0;
        for (int i = 0; i < matrix.size(); i++) {
            for (int j = 0; j < matrix[0].size(); j++) {
                if (matrix[i][j] == '1') {
                    maxSide = max(maxSide, maxSquareHelper(matrix, i, j));
                }
            }
        }
        return maxSide * maxSide;
    }
};`,
    solutionMemoization: `class Solution {
public:
    int maxSquareHelper(vector<vector<char>>& matrix, int i, int j, vector<vector<int>>& dp) {
        if (i >= matrix.size() || j >= matrix[0].size() || matrix[i][j] == '0') return 0;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        int right = maxSquareHelper(matrix, i, j + 1, dp);
        int down = maxSquareHelper(matrix, i + 1, j, dp);
        int diag = maxSquareHelper(matrix, i + 1, j + 1, dp);
        
        return dp[i][j] = 1 + min({right, down, diag});
    }
    
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> dp(m, vector<int>(n, -1));
        int maxSide = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == '1') {
                    maxSide = max(maxSide, maxSquareHelper(matrix, i, j, dp));
                }
            }
        }
        return maxSide * maxSide;
    }
};`,
    solutionTabulation: `class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));
        int maxSide = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == '1') {
                    if (i == 0 || j == 0) {
                        dp[i][j] = 1;
                    } else {
                        dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
                    }
                    maxSide = max(maxSide, dp[i][j]);
                }
            }
        }
        
        return maxSide * maxSide;
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<int> prev(n, 0);
        int maxSide = 0;
        
        for (int i = 0; i < m; i++) {
            vector<int> curr(n, 0);
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == '1') {
                    if (i == 0 || j == 0) {
                        curr[j] = 1;
                    } else {
                        curr[j] = 1 + min({prev[j], curr[j-1], prev[j-1]});
                    }
                    maxSide = max(maxSide, curr[j]);
                }
            }
            prev = curr;
        }
        
        return maxSide * maxSide;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Matrix"],
  },
  {
    title: "LC 516 – Longest Palindromic Subsequence",
    description: "Find the length of the longest palindromic subsequence in a string.",
    leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-subsequence/",
    constraints: ["1 <= s.length <= 1000", "s consists only of lowercase English letters."],
    solutionRecursion: `class Solution {
public:
    int lpsHelper(string& s, int i, int j) {
        if (i > j) return 0;
        if (i == j) return 1;
        
        if (s[i] == s[j]) {
            return 2 + lpsHelper(s, i + 1, j - 1);
        }
        
        return max(lpsHelper(s, i + 1, j), lpsHelper(s, i, j - 1));
    }
    
    int longestPalindromeSubseq(string s) {
        return lpsHelper(s, 0, s.length() - 1);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int lpsHelper(string& s, int i, int j, vector<vector<int>>& dp) {
        if (i > j) return 0;
        if (i == j) return 1;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        if (s[i] == s[j]) {
            return dp[i][j] = 2 + lpsHelper(s, i + 1, j - 1, dp);
        }
        
        return dp[i][j] = max(lpsHelper(s, i + 1, j, dp), lpsHelper(s, i, j - 1, dp));
    }
    
    int longestPalindromeSubseq(string s) {
        int n = s.length();
        vector<vector<int>> dp(n, vector<int>(n, -1));
        return lpsHelper(s, 0, n - 1, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int n = s.length();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        
        for (int i = 0; i < n; i++) dp[i][i] = 1;
        
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                if (s[i] == s[j]) {
                    dp[i][j] = 2 + dp[i + 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[0][n - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int n = s.length();
        vector<int> prev(n, 0);
        
        for (int i = n - 1; i >= 0; i--) {
            vector<int> curr(n, 0);
            curr[i] = 1;
            for (int j = i + 1; j < n; j++) {
                if (s[i] == s[j]) {
                    curr[j] = 2 + prev[j - 1];
                } else {
                    curr[j] = max(prev[j], curr[j - 1]);
                }
            }
            prev = curr;
        }
        
        return prev[n - 1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 416 – Partition Equal Subset Sum",
    description: "Determine if array can be partitioned into two subsets with equal sum.",
    leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
    constraints: ["1 <= nums.length <= 200", "1 <= nums[i] <= 100"],
    solutionRecursion: `class Solution {
public:
    bool canPartitionHelper(vector<int>& nums, int idx, int target) {
        if (target == 0) return true;
        if (idx >= nums.size() || target < 0) return false;
        
        return canPartitionHelper(nums, idx + 1, target - nums[idx]) || 
               canPartitionHelper(nums, idx + 1, target);
    }
    
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % 2) return false;
        return canPartitionHelper(nums, 0, sum / 2);
    }
};`,
    solutionMemoization: `class Solution {
public:
    bool canPartitionHelper(vector<int>& nums, int idx, int target, vector<vector<int>>& dp) {
        if (target == 0) return true;
        if (idx >= nums.size() || target < 0) return false;
        
        if (dp[idx][target] != -1) return dp[idx][target];
        
        bool take = canPartitionHelper(nums, idx + 1, target - nums[idx], dp);
        bool skip = canPartitionHelper(nums, idx + 1, target, dp);
        
        return dp[idx][target] = take || skip;
    }
    
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % 2) return false;
        int target = sum / 2;
        vector<vector<int>> dp(nums.size(), vector<int>(target + 1, -1));
        return canPartitionHelper(nums, 0, target, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % 2) return false;
        int target = sum / 2;
        
        vector<vector<bool>> dp(nums.size() + 1, vector<bool>(target + 1, false));
        for (int i = 0; i <= nums.size(); i++) dp[i][0] = true;
        
        for (int i = 1; i <= nums.size(); i++) {
            for (int j = 1; j <= target; j++) {
                dp[i][j] = dp[i - 1][j];
                if (j >= nums[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j - nums[i - 1]];
                }
            }
        }
        
        return dp[nums.size()][target];
    }
};`,
    solutionSpaceOptimized: `class Solution {
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
    description: "Find number of ways to assign +/- to array elements to reach target sum.",
    leetcodeUrl: "https://leetcode.com/problems/target-sum/",
    constraints: ["1 <= nums.length <= 20", "0 <= nums[i] <= 1000", "-1000 <= target <= 1000"],
    solutionRecursion: `class Solution {
public:
    int findHelper(vector<int>& nums, int idx, int current, int target) {
        if (idx == nums.size()) {
            return current == target ? 1 : 0;
        }
        
        int add = findHelper(nums, idx + 1, current + nums[idx], target);
        int subtract = findHelper(nums, idx + 1, current - nums[idx], target);
        
        return add + subtract;
    }
    
    int findTargetSumWays(vector<int>& nums, int target) {
        return findHelper(nums, 0, 0, target);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int findHelper(vector<int>& nums, int idx, int current, int target, map<pair<int,int>, int>& dp) {
        if (idx == nums.size()) {
            return current == target ? 1 : 0;
        }
        
        pair<int,int> key = {idx, current};
        if (dp.count(key)) return dp[key];
        
        int add = findHelper(nums, idx + 1, current + nums[idx], target, dp);
        int subtract = findHelper(nums, idx + 1, current - nums[idx], target, dp);
        
        return dp[key] = add + subtract;
    }
    
    int findTargetSumWays(vector<int>& nums, int target) {
        map<pair<int,int>, int> dp;
        return findHelper(nums, 0, 0, target, dp);
    }
};`,
    solutionTabulation: `class Solution {
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
    solutionSpaceOptimized: `class Solution {
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
    title: "LC 518 – Coin Change II",
    description: "Find number of combinations that make up an amount using coins.",
    leetcodeUrl: "https://leetcode.com/problems/coin-change-ii/",
    constraints: ["1 <= coins.length <= 300", "1 <= coins[i] <= 5000", "0 <= amount <= 5000"],
    solutionRecursion: `class Solution {
public:
    int changeHelper(int amount, vector<int>& coins, int idx) {
        if (amount == 0) return 1;
        if (idx >= coins.size() || amount < 0) return 0;
        
        int take = changeHelper(amount - coins[idx], coins, idx);
        int skip = changeHelper(amount, coins, idx + 1);
        
        return take + skip;
    }
    
    int change(int amount, vector<int>& coins) {
        return changeHelper(amount, coins, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int changeHelper(int amount, vector<int>& coins, int idx, vector<vector<int>>& dp) {
        if (amount == 0) return 1;
        if (idx >= coins.size() || amount < 0) return 0;
        
        if (dp[idx][amount] != -1) return dp[idx][amount];
        
        int take = changeHelper(amount - coins[idx], coins, idx, dp);
        int skip = changeHelper(amount, coins, idx + 1, dp);
        
        return dp[idx][amount] = take + skip;
    }
    
    int change(int amount, vector<int>& coins) {
        vector<vector<int>> dp(coins.size(), vector<int>(amount + 1, -1));
        return changeHelper(amount, coins, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;
        
        for (int coin : coins) {
            for (int j = coin; j <= amount; j++) {
                dp[j] += dp[j - coin];
            }
        }
        
        return dp[amount];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;
        
        for (int coin : coins) {
            for (int j = coin; j <= amount; j++) {
                dp[j] += dp[j - coin];
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
    title: "LC 122 – Best Time to Buy and Sell Stock II",
    description: "Find maximum profit with unlimited transactions.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
    constraints: ["1 <= prices.length <= 3 * 10^4", "0 <= prices[i] <= 10^4"],
    solutionRecursion: `class Solution {
public:
    int maxProfitHelper(vector<int>& prices, int idx, bool holding) {
        if (idx >= prices.size()) return 0;
        
        if (holding) {
            int sell = prices[idx] + maxProfitHelper(prices, idx + 1, false);
            int hold = maxProfitHelper(prices, idx + 1, true);
            return max(sell, hold);
        } else {
            int buy = -prices[idx] + maxProfitHelper(prices, idx + 1, true);
            int skip = maxProfitHelper(prices, idx + 1, false);
            return max(buy, skip);
        }
    }
    
    int maxProfit(vector<int>& prices) {
        return maxProfitHelper(prices, 0, false);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int maxProfitHelper(vector<int>& prices, int idx, bool holding, vector<vector<int>>& dp) {
        if (idx >= prices.size()) return 0;
        
        if (dp[idx][holding] != -1) return dp[idx][holding];
        
        if (holding) {
            int sell = prices[idx] + maxProfitHelper(prices, idx + 1, false, dp);
            int hold = maxProfitHelper(prices, idx + 1, true, dp);
            return dp[idx][holding] = max(sell, hold);
        } else {
            int buy = -prices[idx] + maxProfitHelper(prices, idx + 1, true, dp);
            int skip = maxProfitHelper(prices, idx + 1, false, dp);
            return dp[idx][holding] = max(buy, skip);
        }
    }
    
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n, vector<int>(2, -1));
        return maxProfitHelper(prices, 0, false, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));
        
        for (int i = n - 1; i >= 0; i--) {
            dp[i][0] = max(-prices[i] + dp[i + 1][1], dp[i + 1][0]);
            dp[i][1] = max(prices[i] + dp[i + 1][0], dp[i + 1][1]);
        }
        
        return dp[0][0];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int profit = 0;
        
        for (int i = 1; i < prices.size(); i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
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
    title: "LC 309 – Best Time with Cooldown",
    description: "Find maximum profit with cooldown period after selling.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    constraints: ["1 <= prices.length <= 5000", "0 <= prices[i] <= 1000"],
    solutionRecursion: `class Solution {
public:
    int maxProfitHelper(vector<int>& prices, int idx, bool holding) {
        if (idx >= prices.size()) return 0;
        
        if (holding) {
            int sell = prices[idx] + maxProfitHelper(prices, idx + 2, false);
            int hold = maxProfitHelper(prices, idx + 1, true);
            return max(sell, hold);
        } else {
            int buy = -prices[idx] + maxProfitHelper(prices, idx + 1, true);
            int skip = maxProfitHelper(prices, idx + 1, false);
            return max(buy, skip);
        }
    }
    
    int maxProfit(vector<int>& prices) {
        return maxProfitHelper(prices, 0, false);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int maxProfitHelper(vector<int>& prices, int idx, bool holding, vector<vector<int>>& dp) {
        if (idx >= prices.size()) return 0;
        
        if (dp[idx][holding] != -1) return dp[idx][holding];
        
        if (holding) {
            int sell = prices[idx] + maxProfitHelper(prices, idx + 2, false, dp);
            int hold = maxProfitHelper(prices, idx + 1, true, dp);
            return dp[idx][holding] = max(sell, hold);
        } else {
            int buy = -prices[idx] + maxProfitHelper(prices, idx + 1, true, dp);
            int skip = maxProfitHelper(prices, idx + 1, false, dp);
            return dp[idx][holding] = max(buy, skip);
        }
    }
    
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n, vector<int>(2, -1));
        return maxProfitHelper(prices, 0, false, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        if (n <= 1) return 0;
        
        vector<vector<int>> dp(n + 2, vector<int>(2, 0));
        
        for (int i = n - 1; i >= 0; i--) {
            dp[i][0] = max(-prices[i] + dp[i + 1][1], dp[i + 1][0]);
            dp[i][1] = max(prices[i] + dp[i + 2][0], dp[i + 1][1]);
        }
        
        return dp[0][0];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        if (n <= 1) return 0;
        
        int sell = 0, buy = -prices[0], prev = 0;
        
        for (int i = 1; i < n; i++) {
            int temp = sell;
            sell = max(sell, buy + prices[i]);
            buy = max(buy, prev - prices[i]);
            prev = temp;
        }
        
        return sell;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 115 – Distinct Subsequences",
    description: "Count distinct subsequences of s that equal t.",
    leetcodeUrl: "https://leetcode.com/problems/distinct-subsequences/",
    constraints: ["1 <= s.length, t.length <= 1000", "s and t consist of English letters."],
    solutionRecursion: `class Solution {
public:
    int numDistinctHelper(string& s, string& t, int i, int j) {
        if (j < 0) return 1;
        if (i < 0) return 0;
        
        if (s[i] == t[j]) {
            return numDistinctHelper(s, t, i - 1, j - 1) + numDistinctHelper(s, t, i - 1, j);
        }
        
        return numDistinctHelper(s, t, i - 1, j);
    }
    
    int numDistinct(string s, string t) {
        return numDistinctHelper(s, t, s.length() - 1, t.length() - 1);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int numDistinctHelper(string& s, string& t, int i, int j, vector<vector<int>>& dp) {
        if (j < 0) return 1;
        if (i < 0) return 0;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        if (s[i] == t[j]) {
            return dp[i][j] = numDistinctHelper(s, t, i - 1, j - 1, dp) + 
                              numDistinctHelper(s, t, i - 1, j, dp);
        }
        
        return dp[i][j] = numDistinctHelper(s, t, i - 1, j, dp);
    }
    
    int numDistinct(string s, string t) {
        int m = s.length(), n = t.length();
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return numDistinctHelper(s, t, m - 1, n - 1, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.length(), n = t.length();
        vector<vector<double>> dp(m + 1, vector<double>(n + 1, 0));
        
        for (int i = 0; i <= m; i++) dp[i][0] = 1;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i - 1] == t[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }
        
        return (int)dp[m][n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.length(), n = t.length();
        vector<double> prev(n + 1, 0);
        prev[0] = 1;
        
        for (int i = 1; i <= m; i++) {
            vector<double> curr(n + 1, 0);
            curr[0] = 1;
            for (int j = 1; j <= n; j++) {
                if (s[i - 1] == t[j - 1]) {
                    curr[j] = prev[j - 1] + prev[j];
                } else {
                    curr[j] = prev[j];
                }
            }
            prev = curr;
        }
        
        return (int)prev[n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 132 – Palindrome Partitioning II",
    description: "Find minimum cuts needed for palindrome partitioning.",
    leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning-ii/",
    constraints: ["1 <= s.length <= 2000", "s consists of lowercase English letters only."],
    solutionRecursion: `class Solution {
public:
    bool isPalindrome(string& s, int i, int j) {
        while (i < j) {
            if (s[i++] != s[j--]) return false;
        }
        return true;
    }
    
    int minCutHelper(string& s, int idx) {
        if (idx == s.length()) return 0;
        if (isPalindrome(s, idx, s.length() - 1)) return 0;
        
        int minCuts = INT_MAX;
        for (int i = idx; i < s.length(); i++) {
            if (isPalindrome(s, idx, i)) {
                minCuts = min(minCuts, 1 + minCutHelper(s, i + 1));
            }
        }
        
        return minCuts;
    }
    
    int minCut(string s) {
        return minCutHelper(s, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    bool isPalindrome(string& s, int i, int j) {
        while (i < j) {
            if (s[i++] != s[j--]) return false;
        }
        return true;
    }
    
    int minCutHelper(string& s, int idx, vector<int>& dp) {
        if (idx == s.length()) return 0;
        if (isPalindrome(s, idx, s.length() - 1)) return 0;
        
        if (dp[idx] != -1) return dp[idx];
        
        int minCuts = INT_MAX;
        for (int i = idx; i < s.length(); i++) {
            if (isPalindrome(s, idx, i)) {
                minCuts = min(minCuts, 1 + minCutHelper(s, i + 1, dp));
            }
        }
        
        return dp[idx] = minCuts;
    }
    
    int minCut(string s) {
        int n = s.length();
        vector<int> dp(n, -1);
        return minCutHelper(s, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int minCut(string s) {
        int n = s.length();
        vector<vector<bool>> isPalin(n, vector<bool>(n, false));
        
        for (int i = 0; i < n; i++) isPalin[i][i] = true;
        
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                if (s[i] == s[j]) {
                    isPalin[i][j] = (len == 2) || isPalin[i + 1][j - 1];
                }
            }
        }
        
        vector<int> dp(n);
        for (int i = 0; i < n; i++) {
            if (isPalin[0][i]) {
                dp[i] = 0;
            } else {
                dp[i] = INT_MAX;
                for (int j = 0; j < i; j++) {
                    if (isPalin[j + 1][i]) {
                        dp[i] = min(dp[i], dp[j] + 1);
                    }
                }
            }
        }
        
        return dp[n - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int minCut(string s) {
        int n = s.length();
        vector<vector<bool>> isPalin(n, vector<bool>(n, false));
        
        for (int i = 0; i < n; i++) isPalin[i][i] = true;
        
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                if (s[i] == s[j]) {
                    isPalin[i][j] = (len == 2) || isPalin[i + 1][j - 1];
                }
            }
        }
        
        vector<int> dp(n);
        for (int i = 0; i < n; i++) {
            if (isPalin[0][i]) {
                dp[i] = 0;
            } else {
                dp[i] = INT_MAX;
                for (int j = 0; j < i; j++) {
                    if (isPalin[j + 1][i]) {
                        dp[i] = min(dp[i], dp[j] + 1);
                    }
                }
            }
        }
        
        return dp[n - 1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 312 – Burst Balloons",
    description: "Find maximum coins by bursting balloons optimally.",
    leetcodeUrl: "https://leetcode.com/problems/burst-balloons/",
    constraints: ["n == nums.length", "1 <= n <= 300", "0 <= nums[i] <= 100"],
    solutionRecursion: `class Solution {
public:
    int maxCoinsHelper(vector<int>& nums, int left, int right) {
        if (left > right) return 0;
        
        int maxCoins = 0;
        for (int i = left; i <= right; i++) {
            int coins = nums[left - 1] * nums[i] * nums[right + 1];
            coins += maxCoinsHelper(nums, left, i - 1) + maxCoinsHelper(nums, i + 1, right);
            maxCoins = max(maxCoins, coins);
        }
        
        return maxCoins;
    }
    
    int maxCoins(vector<int>& nums) {
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        return maxCoinsHelper(nums, 1, nums.size() - 2);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int maxCoinsHelper(vector<int>& nums, int left, int right, vector<vector<int>>& dp) {
        if (left > right) return 0;
        
        if (dp[left][right] != -1) return dp[left][right];
        
        int maxCoins = 0;
        for (int i = left; i <= right; i++) {
            int coins = nums[left - 1] * nums[i] * nums[right + 1];
            coins += maxCoinsHelper(nums, left, i - 1, dp) + maxCoinsHelper(nums, i + 1, right, dp);
            maxCoins = max(maxCoins, coins);
        }
        
        return dp[left][right] = maxCoins;
    }
    
    int maxCoins(vector<int>& nums) {
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(n, -1));
        return maxCoinsHelper(nums, 1, n - 2, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int maxCoins(vector<int>& nums) {
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        
        for (int len = 1; len <= n - 2; len++) {
            for (int left = 1; left + len - 1 <= n - 2; left++) {
                int right = left + len - 1;
                for (int i = left; i <= right; i++) {
                    int coins = nums[left - 1] * nums[i] * nums[right + 1];
                    coins += dp[left][i - 1] + dp[i + 1][right];
                    dp[left][right] = max(dp[left][right], coins);
                }
            }
        }
        
        return dp[1][n - 2];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int maxCoins(vector<int>& nums) {
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        
        for (int len = 1; len <= n - 2; len++) {
            for (int left = 1; left + len - 1 <= n - 2; left++) {
                int right = left + len - 1;
                for (int i = left; i <= right; i++) {
                    int coins = nums[left - 1] * nums[i] * nums[right + 1];
                    coins += dp[left][i - 1] + dp[i + 1][right];
                    dp[left][right] = max(dp[left][right], coins);
                }
            }
        }
        
        return dp[1][n - 2];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 673 – Number of Longest Increasing Subsequence",
    description: "Find the number of longest increasing subsequences.",
    leetcodeUrl: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
    constraints: ["1 <= nums.length <= 2000", "-10^6 <= nums[i] <= 10^6"],
    solutionRecursion: `class Solution {
public:
    pair<int,int> lisHelper(vector<int>& nums, int idx, int prev) {
        if (idx >= nums.size()) return {0, 1};
        
        pair<int,int> skip = lisHelper(nums, idx + 1, prev);
        pair<int,int> take = {0, 0};
        
        if (prev == -1 || nums[idx] > nums[prev]) {
            take = lisHelper(nums, idx + 1, idx);
            take.first++;
        }
        
        if (take.first > skip.first) return take;
        if (skip.first > take.first) return skip;
        return {take.first, take.second + skip.second};
    }
    
    int findNumberOfLIS(vector<int>& nums) {
        return lisHelper(nums, 0, -1).second;
    }
};`,
    solutionMemoization: `class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> len(n, 1), cnt(n, 1);
        
        int maxLen = 1;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    if (len[j] + 1 > len[i]) {
                        len[i] = len[j] + 1;
                        cnt[i] = cnt[j];
                    } else if (len[j] + 1 == len[i]) {
                        cnt[i] += cnt[j];
                    }
                }
            }
            maxLen = max(maxLen, len[i]);
        }
        
        int result = 0;
        for (int i = 0; i < n; i++) {
            if (len[i] == maxLen) result += cnt[i];
        }
        
        return result;
    }
};`,
    solutionTabulation: `class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> len(n, 1), cnt(n, 1);
        
        int maxLen = 1;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    if (len[j] + 1 > len[i]) {
                        len[i] = len[j] + 1;
                        cnt[i] = cnt[j];
                    } else if (len[j] + 1 == len[i]) {
                        cnt[i] += cnt[j];
                    }
                }
            }
            maxLen = max(maxLen, len[i]);
        }
        
        int result = 0;
        for (int i = 0; i < n; i++) {
            if (len[i] == maxLen) result += cnt[i];
        }
        
        return result;
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> len(n, 1), cnt(n, 1);
        
        int maxLen = 1;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    if (len[j] + 1 > len[i]) {
                        len[i] = len[j] + 1;
                        cnt[i] = cnt[j];
                    } else if (len[j] + 1 == len[i]) {
                        cnt[i] += cnt[j];
                    }
                }
            }
            maxLen = max(maxLen, len[i]);
        }
        
        int result = 0;
        for (int i = 0; i < n; i++) {
            if (len[i] == maxLen) result += cnt[i];
        }
        
        return result;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Binary Search"],
  },
  {
    title: "LC 583 – Delete Operation for Two Strings",
    description: "Find minimum steps to make two strings equal by deleting characters.",
    leetcodeUrl: "https://leetcode.com/problems/delete-operation-for-two-strings/",
    constraints: ["1 <= word1.length, word2.length <= 500", "word1 and word2 consist of only lowercase English letters."],
    solutionRecursion: `class Solution {
public:
    int minDistanceHelper(string& word1, string& word2, int i, int j) {
        if (i == 0) return j;
        if (j == 0) return i;
        
        if (word1[i - 1] == word2[j - 1]) {
            return minDistanceHelper(word1, word2, i - 1, j - 1);
        }
        
        return 1 + min(minDistanceHelper(word1, word2, i - 1, j), 
                       minDistanceHelper(word1, word2, i, j - 1));
    }
    
    int minDistance(string word1, string word2) {
        return minDistanceHelper(word1, word2, word1.length(), word2.length());
    }
};`,
    solutionMemoization: `class Solution {
public:
    int minDistanceHelper(string& word1, string& word2, int i, int j, vector<vector<int>>& dp) {
        if (i == 0) return j;
        if (j == 0) return i;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        if (word1[i - 1] == word2[j - 1]) {
            return dp[i][j] = minDistanceHelper(word1, word2, i - 1, j - 1, dp);
        }
        
        return dp[i][j] = 1 + min(minDistanceHelper(word1, word2, i - 1, j, dp), 
                                   minDistanceHelper(word1, word2, i, j - 1, dp));
    }
    
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, -1));
        return minDistanceHelper(word1, word2, m, n, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[m][n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<int> prev(n + 1), curr(n + 1);
        
        for (int j = 0; j <= n; j++) prev[j] = j;
        
        for (int i = 1; i <= m; i++) {
            curr[0] = i;
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    curr[j] = prev[j - 1];
                } else {
                    curr[j] = 1 + min(prev[j], curr[j - 1]);
                }
            }
            prev = curr;
        }
        
        return prev[n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 1312 – Minimum Insertion Steps",
    description: "Find minimum insertions to make a string palindrome.",
    leetcodeUrl: "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/",
    constraints: ["1 <= s.length <= 500", "s consists of lowercase English letters."],
    solutionRecursion: `class Solution {
public:
    int minInsertionsHelper(string& s, int i, int j) {
        if (i >= j) return 0;
        
        if (s[i] == s[j]) {
            return minInsertionsHelper(s, i + 1, j - 1);
        }
        
        return 1 + min(minInsertionsHelper(s, i + 1, j), minInsertionsHelper(s, i, j - 1));
    }
    
    int minInsertions(string s) {
        return minInsertionsHelper(s, 0, s.length() - 1);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int minInsertionsHelper(string& s, int i, int j, vector<vector<int>>& dp) {
        if (i >= j) return 0;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        if (s[i] == s[j]) {
            return dp[i][j] = minInsertionsHelper(s, i + 1, j - 1, dp);
        }
        
        return dp[i][j] = 1 + min(minInsertionsHelper(s, i + 1, j, dp), 
                                   minInsertionsHelper(s, i, j - 1, dp));
    }
    
    int minInsertions(string s) {
        int n = s.length();
        vector<vector<int>> dp(n, vector<int>(n, -1));
        return minInsertionsHelper(s, 0, n - 1, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int minInsertions(string s) {
        int n = s.length();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i + 1; j < n; j++) {
                if (s[i] == s[j]) {
                    dp[i][j] = dp[i + 1][j - 1];
                } else {
                    dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[0][n - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int minInsertions(string s) {
        int n = s.length();
        vector<int> prev(n, 0);
        
        for (int i = n - 1; i >= 0; i--) {
            vector<int> curr(n, 0);
            for (int j = i + 1; j < n; j++) {
                if (s[i] == s[j]) {
                    curr[j] = prev[j - 1];
                } else {
                    curr[j] = 1 + min(prev[j], curr[j - 1]);
                }
            }
            prev = curr;
        }
        
        return prev[n - 1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 1035 – Uncrossed Lines",
    description: "Find maximum uncrossed connecting lines between two arrays.",
    leetcodeUrl: "https://leetcode.com/problems/uncrossed-lines/",
    constraints: ["1 <= nums1.length, nums2.length <= 500", "1 <= nums1[i], nums2[j] <= 2000"],
    solutionRecursion: `class Solution {
public:
    int maxUncrossedHelper(vector<int>& nums1, vector<int>& nums2, int i, int j) {
        if (i >= nums1.size() || j >= nums2.size()) return 0;
        
        if (nums1[i] == nums2[j]) {
            return 1 + maxUncrossedHelper(nums1, nums2, i + 1, j + 1);
        }
        
        return max(maxUncrossedHelper(nums1, nums2, i + 1, j), 
                   maxUncrossedHelper(nums1, nums2, i, j + 1));
    }
    
    int maxUncrossedLines(vector<int>& nums1, vector<int>& nums2) {
        return maxUncrossedHelper(nums1, nums2, 0, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int maxUncrossedHelper(vector<int>& nums1, vector<int>& nums2, int i, int j, 
                          vector<vector<int>>& dp) {
        if (i >= nums1.size() || j >= nums2.size()) return 0;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        if (nums1[i] == nums2[j]) {
            return dp[i][j] = 1 + maxUncrossedHelper(nums1, nums2, i + 1, j + 1, dp);
        }
        
        return dp[i][j] = max(maxUncrossedHelper(nums1, nums2, i + 1, j, dp), 
                              maxUncrossedHelper(nums1, nums2, i, j + 1, dp));
    }
    
    int maxUncrossedLines(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return maxUncrossedHelper(nums1, nums2, 0, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int maxUncrossedLines(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (nums1[i - 1] == nums2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[m][n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int maxUncrossedLines(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        vector<int> prev(n + 1, 0);
        
        for (int i = 1; i <= m; i++) {
            vector<int> curr(n + 1, 0);
            for (int j = 1; j <= n; j++) {
                if (nums1[i - 1] == nums2[j - 1]) {
                    curr[j] = 1 + prev[j - 1];
                } else {
                    curr[j] = max(prev[j], curr[j - 1]);
                }
            }
            prev = curr;
        }
        
        return prev[n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 123 – Best Time III",
    description: "Find maximum profit with at most two transactions.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^5"],
    solutionRecursion: `class Solution {
public:
    int maxProfitHelper(vector<int>& prices, int idx, int canBuy, int txns) {
        if (idx >= prices.size() || txns == 0) return 0;
        
        if (canBuy) {
            int buy = -prices[idx] + maxProfitHelper(prices, idx + 1, 0, txns);
            int skip = maxProfitHelper(prices, idx + 1, 1, txns);
            return max(buy, skip);
        } else {
            int sell = prices[idx] + maxProfitHelper(prices, idx + 1, 1, txns - 1);
            int hold = maxProfitHelper(prices, idx + 1, 0, txns);
            return max(sell, hold);
        }
    }
    
    int maxProfit(vector<int>& prices) {
        return maxProfitHelper(prices, 0, 1, 2);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int maxProfitHelper(vector<int>& prices, int idx, int canBuy, int txns, 
                       vector<vector<vector<int>>>& dp) {
        if (idx >= prices.size() || txns == 0) return 0;
        
        if (dp[idx][canBuy][txns] != -1) return dp[idx][canBuy][txns];
        
        if (canBuy) {
            int buy = -prices[idx] + maxProfitHelper(prices, idx + 1, 0, txns, dp);
            int skip = maxProfitHelper(prices, idx + 1, 1, txns, dp);
            return dp[idx][canBuy][txns] = max(buy, skip);
        } else {
            int sell = prices[idx] + maxProfitHelper(prices, idx + 1, 1, txns - 1, dp);
            int hold = maxProfitHelper(prices, idx + 1, 0, txns, dp);
            return dp[idx][canBuy][txns] = max(sell, hold);
        }
    }
    
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(2, vector<int>(3, -1)));
        return maxProfitHelper(prices, 0, 1, 2, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<vector<int>>> dp(n + 1, vector<vector<int>>(2, vector<int>(3, 0)));
        
        for (int i = n - 1; i >= 0; i--) {
            for (int canBuy = 0; canBuy <= 1; canBuy++) {
                for (int txns = 1; txns <= 2; txns++) {
                    if (canBuy) {
                        dp[i][canBuy][txns] = max(-prices[i] + dp[i + 1][0][txns], 
                                                   dp[i + 1][1][txns]);
                    } else {
                        dp[i][canBuy][txns] = max(prices[i] + dp[i + 1][1][txns - 1], 
                                                   dp[i + 1][0][txns]);
                    }
                }
            }
        }
        
        return dp[0][1][2];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int buy1 = INT_MIN, buy2 = INT_MIN;
        int sell1 = 0, sell2 = 0;
        
        for (int price : prices) {
            buy1 = max(buy1, -price);
            sell1 = max(sell1, buy1 + price);
            buy2 = max(buy2, sell1 - price);
            sell2 = max(sell2, buy2 + price);
        }
        
        return sell2;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 188 – Best Time IV",
    description: "Find maximum profit with at most k transactions.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
    constraints: ["1 <= k <= 100", "1 <= prices.length <= 1000", "0 <= prices[i] <= 1000"],
    solutionRecursion: `class Solution {
public:
    int maxProfitHelper(vector<int>& prices, int idx, int canBuy, int txns) {
        if (idx >= prices.size() || txns == 0) return 0;
        
        if (canBuy) {
            int buy = -prices[idx] + maxProfitHelper(prices, idx + 1, 0, txns);
            int skip = maxProfitHelper(prices, idx + 1, 1, txns);
            return max(buy, skip);
        } else {
            int sell = prices[idx] + maxProfitHelper(prices, idx + 1, 1, txns - 1);
            int hold = maxProfitHelper(prices, idx + 1, 0, txns);
            return max(sell, hold);
        }
    }
    
    int maxProfit(int k, vector<int>& prices) {
        return maxProfitHelper(prices, 0, 1, k);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int maxProfitHelper(vector<int>& prices, int idx, int canBuy, int txns, 
                       vector<vector<vector<int>>>& dp) {
        if (idx >= prices.size() || txns == 0) return 0;
        
        if (dp[idx][canBuy][txns] != -1) return dp[idx][canBuy][txns];
        
        if (canBuy) {
            int buy = -prices[idx] + maxProfitHelper(prices, idx + 1, 0, txns, dp);
            int skip = maxProfitHelper(prices, idx + 1, 1, txns, dp);
            return dp[idx][canBuy][txns] = max(buy, skip);
        } else {
            int sell = prices[idx] + maxProfitHelper(prices, idx + 1, 1, txns - 1, dp);
            int hold = maxProfitHelper(prices, idx + 1, 0, txns, dp);
            return dp[idx][canBuy][txns] = max(sell, hold);
        }
    }
    
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(2, vector<int>(k + 1, -1)));
        return maxProfitHelper(prices, 0, 1, k, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        if (n == 0) return 0;
        
        vector<vector<vector<int>>> dp(n + 1, vector<vector<int>>(2, vector<int>(k + 1, 0)));
        
        for (int i = n - 1; i >= 0; i--) {
            for (int canBuy = 0; canBuy <= 1; canBuy++) {
                for (int txns = 1; txns <= k; txns++) {
                    if (canBuy) {
                        dp[i][canBuy][txns] = max(-prices[i] + dp[i + 1][0][txns], 
                                                   dp[i + 1][1][txns]);
                    } else {
                        dp[i][canBuy][txns] = max(prices[i] + dp[i + 1][1][txns - 1], 
                                                   dp[i + 1][0][txns]);
                    }
                }
            }
        }
        
        return dp[0][1][k];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        if (prices.empty()) return 0;
        
        vector<int> buy(k + 1, INT_MIN);
        vector<int> sell(k + 1, 0);
        
        for (int price : prices) {
            for (int i = k; i >= 1; i--) {
                sell[i] = max(sell[i], buy[i] + price);
                buy[i] = max(buy[i], sell[i - 1] - price);
            }
        }
        
        return sell[k];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 714 – Best Time with Fee",
    description: "Find maximum profit with unlimited transactions and transaction fee.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
    constraints: ["1 <= prices.length <= 5 * 10^4", "1 <= prices[i] < 5 * 10^4", "0 <= fee < 5 * 10^4"],
    solutionRecursion: `class Solution {
public:
    int maxProfitHelper(vector<int>& prices, int idx, bool holding, int fee) {
        if (idx >= prices.size()) return 0;
        
        if (holding) {
            int sell = prices[idx] - fee + maxProfitHelper(prices, idx + 1, false, fee);
            int hold = maxProfitHelper(prices, idx + 1, true, fee);
            return max(sell, hold);
        } else {
            int buy = -prices[idx] + maxProfitHelper(prices, idx + 1, true, fee);
            int skip = maxProfitHelper(prices, idx + 1, false, fee);
            return max(buy, skip);
        }
    }
    
    int maxProfit(vector<int>& prices, int fee) {
        return maxProfitHelper(prices, 0, false, fee);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int maxProfitHelper(vector<int>& prices, int idx, bool holding, int fee, 
                       vector<vector<int>>& dp) {
        if (idx >= prices.size()) return 0;
        
        if (dp[idx][holding] != -1) return dp[idx][holding];
        
        if (holding) {
            int sell = prices[idx] - fee + maxProfitHelper(prices, idx + 1, false, fee, dp);
            int hold = maxProfitHelper(prices, idx + 1, true, fee, dp);
            return dp[idx][holding] = max(sell, hold);
        } else {
            int buy = -prices[idx] + maxProfitHelper(prices, idx + 1, true, fee, dp);
            int skip = maxProfitHelper(prices, idx + 1, false, fee, dp);
            return dp[idx][holding] = max(buy, skip);
        }
    }
    
    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        vector<vector<int>> dp(n, vector<int>(2, -1));
        return maxProfitHelper(prices, 0, false, fee, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));
        
        for (int i = n - 1; i >= 0; i--) {
            dp[i][0] = max(-prices[i] + dp[i + 1][1], dp[i + 1][0]);
            dp[i][1] = max(prices[i] - fee + dp[i + 1][0], dp[i + 1][1]);
        }
        
        return dp[0][0];
    }
};`,
    solutionSpaceOptimized: `class Solution {
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
  {
    title: "LC 1049 – Last Stone Weight II",
    description: "Find minimum possible weight after smashing stones.",
    leetcodeUrl: "https://leetcode.com/problems/last-stone-weight-ii/",
    constraints: ["1 <= stones.length <= 30", "1 <= stones[i] <= 100"],
    solutionRecursion: `class Solution {
public:
    int helper(vector<int>& stones, int idx, int diff) {
        if (idx >= stones.size()) return abs(diff);
        
        int add = helper(stones, idx + 1, diff + stones[idx]);
        int subtract = helper(stones, idx + 1, diff - stones[idx]);
        
        return min(add, subtract);
    }
    
    int lastStoneWeightII(vector<int>& stones) {
        return helper(stones, 0, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int helper(vector<int>& stones, int idx, int diff, map<pair<int,int>, int>& dp) {
        if (idx >= stones.size()) return abs(diff);
        
        pair<int,int> key = {idx, diff};
        if (dp.count(key)) return dp[key];
        
        int add = helper(stones, idx + 1, diff + stones[idx], dp);
        int subtract = helper(stones, idx + 1, diff - stones[idx], dp);
        
        return dp[key] = min(add, subtract);
    }
    
    int lastStoneWeightII(vector<int>& stones) {
        map<pair<int,int>, int> dp;
        return helper(stones, 0, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
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
    solutionSpaceOptimized: `class Solution {
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
  {
    title: "LC 85 – Maximal Rectangle",
    description: "Find largest rectangle containing only 1's in a binary matrix.",
    leetcodeUrl: "https://leetcode.com/problems/maximal-rectangle/",
    constraints: ["rows == matrix.length", "cols == matrix[i].length", "1 <= rows, cols <= 200"],
    solutionRecursion: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        int maxArea = 0, n = heights.size();
        
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!st.empty() && h < heights[st.top()]) {
                int height = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            st.push(i);
        }
        
        return maxArea;
    }
    
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        vector<int> heights(n, 0);
        int maxArea = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                heights[j] = (matrix[i][j] == '1') ? heights[j] + 1 : 0;
            }
            maxArea = max(maxArea, largestRectangleArea(heights));
        }
        
        return maxArea;
    }
};`,
    solutionMemoization: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        int maxArea = 0, n = heights.size();
        
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!st.empty() && h < heights[st.top()]) {
                int height = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            st.push(i);
        }
        
        return maxArea;
    }
    
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        vector<int> heights(n, 0);
        int maxArea = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                heights[j] = (matrix[i][j] == '1') ? heights[j] + 1 : 0;
            }
            maxArea = max(maxArea, largestRectangleArea(heights));
        }
        
        return maxArea;
    }
};`,
    solutionTabulation: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        int maxArea = 0, n = heights.size();
        
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!st.empty() && h < heights[st.top()]) {
                int height = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            st.push(i);
        }
        
        return maxArea;
    }
    
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        vector<int> heights(n, 0);
        int maxArea = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                heights[j] = (matrix[i][j] == '1') ? heights[j] + 1 : 0;
            }
            maxArea = max(maxArea, largestRectangleArea(heights));
        }
        
        return maxArea;
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        int maxArea = 0, n = heights.size();
        
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!st.empty() && h < heights[st.top()]) {
                int height = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            st.push(i);
        }
        
        return maxArea;
    }
    
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        vector<int> heights(n, 0);
        int maxArea = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                heights[j] = (matrix[i][j] == '1') ? heights[j] + 1 : 0;
            }
            maxArea = max(maxArea, largestRectangleArea(heights));
        }
        
        return maxArea;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array", "Matrix", "Stack"],
  },
  {
    title: "LC 1547 – Minimum Cost to Cut Stick",
    description: "Find minimum cost to cut a stick at given positions.",
    leetcodeUrl: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
    constraints: ["2 <= n <= 10^6", "1 <= cuts.length <= min(n - 1, 100)", "1 <= cuts[i] <= n - 1"],
    solutionRecursion: `class Solution {
public:
    int minCostHelper(vector<int>& cuts, int i, int j) {
        if (i > j) return 0;
        
        int minCost = INT_MAX;
        for (int k = i; k <= j; k++) {
            int cost = cuts[j + 1] - cuts[i - 1] + 
                       minCostHelper(cuts, i, k - 1) + minCostHelper(cuts, k + 1, j);
            minCost = min(minCost, cost);
        }
        
        return minCost;
    }
    
    int minCost(int n, vector<int>& cuts) {
        cuts.push_back(0);
        cuts.push_back(n);
        sort(cuts.begin(), cuts.end());
        return minCostHelper(cuts, 1, cuts.size() - 2);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int minCostHelper(vector<int>& cuts, int i, int j, vector<vector<int>>& dp) {
        if (i > j) return 0;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        int minCost = INT_MAX;
        for (int k = i; k <= j; k++) {
            int cost = cuts[j + 1] - cuts[i - 1] + 
                       minCostHelper(cuts, i, k - 1, dp) + minCostHelper(cuts, k + 1, j, dp);
            minCost = min(minCost, cost);
        }
        
        return dp[i][j] = minCost;
    }
    
    int minCost(int n, vector<int>& cuts) {
        cuts.push_back(0);
        cuts.push_back(n);
        sort(cuts.begin(), cuts.end());
        int m = cuts.size();
        vector<vector<int>> dp(m, vector<int>(m, -1));
        return minCostHelper(cuts, 1, m - 2, dp);
    }
};`,
    solutionTabulation: `class Solution {
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
                    dp[i][j] = min(dp[i][j], cuts[j] - cuts[i] + dp[i][k] + dp[k][j]);
                }
            }
        }
        
        return dp[0][m - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
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
                    dp[i][j] = min(dp[i][j], cuts[j] - cuts[i] + dp[i][k] + dp[k][j]);
                }
            }
        }
        
        return dp[0][m - 1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 1000 – Minimum Cost to Merge Stones",
    description: "Find minimum cost to merge all stones into one pile.",
    leetcodeUrl: "https://leetcode.com/problems/minimum-cost-to-merge-stones/",
    constraints: ["n == stones.length", "1 <= n <= 30", "1 <= stones[i] <= 100", "2 <= k <= 30"],
    solutionRecursion: `class Solution {
public:
    int mergeHelper(vector<int>& stones, int i, int j, int piles, int k, vector<int>& prefix) {
        if (i == j) return piles == 1 ? 0 : INT_MAX / 2;
        if (piles == 1) {
            int cost = mergeHelper(stones, i, j, k, k, prefix);
            if (cost == INT_MAX / 2) return cost;
            return cost + prefix[j + 1] - prefix[i];
        }
        
        int minCost = INT_MAX / 2;
        for (int mid = i; mid < j; mid += k - 1) {
            int left = mergeHelper(stones, i, mid, 1, k, prefix);
            int right = mergeHelper(stones, mid + 1, j, piles - 1, k, prefix);
            minCost = min(minCost, left + right);
        }
        
        return minCost;
    }
    
    int mergeStones(vector<int>& stones, int k) {
        int n = stones.size();
        if ((n - 1) % (k - 1) != 0) return -1;
        
        vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stones[i];
        
        int result = mergeHelper(stones, 0, n - 1, 1, k, prefix);
        return result >= INT_MAX / 2 ? -1 : result;
    }
};`,
    solutionMemoization: `class Solution {
public:
    int mergeHelper(vector<int>& stones, int i, int j, int piles, int k, 
                   vector<int>& prefix, vector<vector<vector<int>>>& dp) {
        if (i == j) return piles == 1 ? 0 : INT_MAX / 2;
        
        if (dp[i][j][piles] != -1) return dp[i][j][piles];
        
        if (piles == 1) {
            int cost = mergeHelper(stones, i, j, k, k, prefix, dp);
            if (cost == INT_MAX / 2) return dp[i][j][piles] = cost;
            return dp[i][j][piles] = cost + prefix[j + 1] - prefix[i];
        }
        
        int minCost = INT_MAX / 2;
        for (int mid = i; mid < j; mid += k - 1) {
            int left = mergeHelper(stones, i, mid, 1, k, prefix, dp);
            int right = mergeHelper(stones, mid + 1, j, piles - 1, k, prefix, dp);
            minCost = min(minCost, left + right);
        }
        
        return dp[i][j][piles] = minCost;
    }
    
    int mergeStones(vector<int>& stones, int k) {
        int n = stones.size();
        if ((n - 1) % (k - 1) != 0) return -1;
        
        vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stones[i];
        
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(n, vector<int>(k + 1, -1)));
        int result = mergeHelper(stones, 0, n - 1, 1, k, prefix, dp);
        return result >= INT_MAX / 2 ? -1 : result;
    }
};`,
    solutionTabulation: `class Solution {
public:
    int mergeStones(vector<int>& stones, int k) {
        int n = stones.size();
        if ((n - 1) % (k - 1) != 0) return -1;
        
        vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stones[i];
        
        vector<vector<int>> dp(n, vector<int>(n, INT_MAX / 2));
        for (int i = 0; i < n; i++) dp[i][i] = 0;
        
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;
                for (int mid = i; mid < j; mid += k - 1) {
                    dp[i][j] = min(dp[i][j], dp[i][mid] + dp[mid + 1][j]);
                }
                if ((j - i) % (k - 1) == 0) {
                    dp[i][j] += prefix[j + 1] - prefix[i];
                }
            }
        }
        
        return dp[0][n - 1] >= INT_MAX / 2 ? -1 : dp[0][n - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int mergeStones(vector<int>& stones, int k) {
        int n = stones.size();
        if ((n - 1) % (k - 1) != 0) return -1;
        
        vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stones[i];
        
        vector<vector<int>> dp(n, vector<int>(n, INT_MAX / 2));
        for (int i = 0; i < n; i++) dp[i][i] = 0;
        
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;
                for (int mid = i; mid < j; mid += k - 1) {
                    dp[i][j] = min(dp[i][j], dp[i][mid] + dp[mid + 1][j]);
                }
                if ((j - i) % (k - 1) == 0) {
                    dp[i][j] += prefix[j + 1] - prefix[i];
                }
            }
        }
        
        return dp[0][n - 1] >= INT_MAX / 2 ? -1 : dp[0][n - 1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 879 – Profitable Schemes",
    description: "Count number of profitable schemes with profit at least minProfit.",
    leetcodeUrl: "https://leetcode.com/problems/profitable-schemes/",
    constraints: ["1 <= n <= 100", "0 <= minProfit <= 100", "1 <= group.length <= 100"],
    solutionRecursion: `class Solution {
public:
    const int MOD = 1e9 + 7;
    
    int profitableHelper(int idx, int people, int profit, vector<int>& group, 
                        vector<int>& profits, int minProfit) {
        if (people < 0) return 0;
        if (idx == group.size()) {
            return profit >= minProfit ? 1 : 0;
        }
        
        int skip = profitableHelper(idx + 1, people, profit, group, profits, minProfit);
        int take = profitableHelper(idx + 1, people - group[idx], 
                                    min(profit + profits[idx], minProfit), 
                                    group, profits, minProfit);
        
        return (skip + take) % MOD;
    }
    
    int profitableSchemes(int n, int minProfit, vector<int>& group, vector<int>& profit) {
        return profitableHelper(0, n, 0, group, profit, minProfit);
    }
};`,
    solutionMemoization: `class Solution {
public:
    const int MOD = 1e9 + 7;
    
    int profitableHelper(int idx, int people, int profit, vector<int>& group, 
                        vector<int>& profits, int minProfit, 
                        vector<vector<vector<int>>>& dp) {
        if (people < 0) return 0;
        if (idx == group.size()) {
            return profit >= minProfit ? 1 : 0;
        }
        
        if (dp[idx][people][profit] != -1) return dp[idx][people][profit];
        
        int skip = profitableHelper(idx + 1, people, profit, group, profits, minProfit, dp);
        int take = profitableHelper(idx + 1, people - group[idx], 
                                    min(profit + profits[idx], minProfit), 
                                    group, profits, minProfit, dp);
        
        return dp[idx][people][profit] = (skip + take) % MOD;
    }
    
    int profitableSchemes(int n, int minProfit, vector<int>& group, vector<int>& profit) {
        vector<vector<vector<int>>> dp(group.size(), 
            vector<vector<int>>(n + 1, vector<int>(minProfit + 1, -1)));
        return profitableHelper(0, n, 0, group, profit, minProfit, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int profitableSchemes(int n, int minProfit, vector<int>& group, vector<int>& profit) {
        const int MOD = 1e9 + 7;
        vector<vector<int>> dp(n + 1, vector<int>(minProfit + 1, 0));
        dp[0][0] = 1;
        
        for (int k = 0; k < group.size(); k++) {
            int g = group[k], p = profit[k];
            for (int i = n; i >= g; i--) {
                for (int j = minProfit; j >= 0; j--) {
                    dp[i][j] = (dp[i][j] + dp[i - g][max(0, j - p)]) % MOD;
                }
            }
        }
        
        int result = 0;
        for (int i = 0; i <= n; i++) {
            result = (result + dp[i][minProfit]) % MOD;
        }
        
        return result;
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int profitableSchemes(int n, int minProfit, vector<int>& group, vector<int>& profit) {
        const int MOD = 1e9 + 7;
        vector<vector<int>> dp(n + 1, vector<int>(minProfit + 1, 0));
        dp[0][0] = 1;
        
        for (int k = 0; k < group.size(); k++) {
            int g = group[k], p = profit[k];
            for (int i = n; i >= g; i--) {
                for (int j = minProfit; j >= 0; j--) {
                    dp[i][j] = (dp[i][j] + dp[i - g][max(0, j - p)]) % MOD;
                }
            }
        }
        
        int result = 0;
        for (int i = 0; i <= n; i++) {
            result = (result + dp[i][minProfit]) % MOD;
        }
        
        return result;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 377 – Combination Sum IV",
    description: "Find number of combinations that add up to target.",
    leetcodeUrl: "https://leetcode.com/problems/combination-sum-iv/",
    constraints: ["1 <= nums.length <= 200", "1 <= nums[i] <= 1000", "1 <= target <= 1000"],
    solutionRecursion: `class Solution {
public:
    int combinationHelper(vector<int>& nums, int target) {
        if (target == 0) return 1;
        if (target < 0) return 0;
        
        int count = 0;
        for (int num : nums) {
            count += combinationHelper(nums, target - num);
        }
        
        return count;
    }
    
    int combinationSum4(vector<int>& nums, int target) {
        return combinationHelper(nums, target);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int combinationHelper(vector<int>& nums, int target, vector<int>& dp) {
        if (target == 0) return 1;
        if (target < 0) return 0;
        
        if (dp[target] != -1) return dp[target];
        
        int count = 0;
        for (int num : nums) {
            if (target >= num) {
                count += combinationHelper(nums, target - num, dp);
            }
        }
        
        return dp[target] = count;
    }
    
    int combinationSum4(vector<int>& nums, int target) {
        vector<int> dp(target + 1, -1);
        return combinationHelper(nums, target, dp);
    }
};`,
    solutionTabulation: `class Solution {
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
    solutionSpaceOptimized: `class Solution {
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
  {
    title: "LC 10 – Regular Expression Matching",
    description: "Implement regex matching with '.' and '*'.",
    leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching/",
    constraints: ["1 <= s.length <= 20", "1 <= p.length <= 20", "s contains only lowercase English letters."],
    solutionRecursion: `class Solution {
public:
    bool isMatchHelper(string& s, string& p, int i, int j) {
        if (j == p.length()) return i == s.length();
        
        bool firstMatch = (i < s.length() && (s[i] == p[j] || p[j] == '.'));
        
        if (j + 1 < p.length() && p[j + 1] == '*') {
            return isMatchHelper(s, p, i, j + 2) || 
                   (firstMatch && isMatchHelper(s, p, i + 1, j));
        }
        
        return firstMatch && isMatchHelper(s, p, i + 1, j + 1);
    }
    
    bool isMatch(string s, string p) {
        return isMatchHelper(s, p, 0, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    bool isMatchHelper(string& s, string& p, int i, int j, vector<vector<int>>& dp) {
        if (j == p.length()) return i == s.length();
        
        if (dp[i][j] != -1) return dp[i][j];
        
        bool firstMatch = (i < s.length() && (s[i] == p[j] || p[j] == '.'));
        
        if (j + 1 < p.length() && p[j + 1] == '*') {
            return dp[i][j] = isMatchHelper(s, p, i, j + 2, dp) || 
                              (firstMatch && isMatchHelper(s, p, i + 1, j, dp));
        }
        
        return dp[i][j] = firstMatch && isMatchHelper(s, p, i + 1, j + 1, dp);
    }
    
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, -1));
        return isMatchHelper(s, p, 0, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        
        for (int j = 2; j <= n; j++) {
            if (p[j - 1] == '*') {
                dp[0][j] = dp[0][j - 2];
            }
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j - 1] == '*') {
                    dp[i][j] = dp[i][j - 2];
                    if (s[i - 1] == p[j - 2] || p[j - 2] == '.') {
                        dp[i][j] = dp[i][j] || dp[i - 1][j];
                    }
                } else if (s[i - 1] == p[j - 1] || p[j - 1] == '.') {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        
        return dp[m][n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<bool> prev(n + 1, false);
        prev[0] = true;
        
        for (int j = 2; j <= n; j++) {
            if (p[j - 1] == '*') prev[j] = prev[j - 2];
        }
        
        for (int i = 1; i <= m; i++) {
            vector<bool> curr(n + 1, false);
            for (int j = 1; j <= n; j++) {
                if (p[j - 1] == '*') {
                    curr[j] = curr[j - 2];
                    if (s[i - 1] == p[j - 2] || p[j - 2] == '.') {
                        curr[j] = curr[j] || prev[j];
                    }
                } else if (s[i - 1] == p[j - 1] || p[j - 1] == '.') {
                    curr[j] = prev[j - 1];
                }
            }
            prev = curr;
        }
        
        return prev[n];
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
    constraints: ["0 <= s.length, p.length <= 2000", "s contains only lowercase English letters.", "p contains only lowercase English letters, '?' or '*'."],
    solutionRecursion: `class Solution {
public:
    bool isMatchHelper(string& s, string& p, int i, int j) {
        if (j == p.length()) return i == s.length();
        if (i == s.length()) {
            while (j < p.length() && p[j] == '*') j++;
            return j == p.length();
        }
        
        if (p[j] == '*') {
            return isMatchHelper(s, p, i + 1, j) || isMatchHelper(s, p, i, j + 1);
        }
        
        if (s[i] == p[j] || p[j] == '?') {
            return isMatchHelper(s, p, i + 1, j + 1);
        }
        
        return false;
    }
    
    bool isMatch(string s, string p) {
        return isMatchHelper(s, p, 0, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    bool isMatchHelper(string& s, string& p, int i, int j, vector<vector<int>>& dp) {
        if (j == p.length()) return i == s.length();
        if (i == s.length()) {
            while (j < p.length() && p[j] == '*') j++;
            return j == p.length();
        }
        
        if (dp[i][j] != -1) return dp[i][j];
        
        if (p[j] == '*') {
            return dp[i][j] = isMatchHelper(s, p, i + 1, j, dp) || 
                              isMatchHelper(s, p, i, j + 1, dp);
        }
        
        if (s[i] == p[j] || p[j] == '?') {
            return dp[i][j] = isMatchHelper(s, p, i + 1, j + 1, dp);
        }
        
        return dp[i][j] = false;
    }
    
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, -1));
        return isMatchHelper(s, p, 0, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') dp[0][j] = dp[0][j - 1];
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j - 1] == '*') {
                    dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
                } else if (s[i - 1] == p[j - 1] || p[j - 1] == '?') {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        
        return dp[m][n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<bool> prev(n + 1, false);
        prev[0] = true;
        
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') prev[j] = prev[j - 1];
        }
        
        for (int i = 1; i <= m; i++) {
            vector<bool> curr(n + 1, false);
            for (int j = 1; j <= n; j++) {
                if (p[j - 1] == '*') {
                    curr[j] = prev[j] || curr[j - 1];
                } else if (s[i - 1] == p[j - 1] || p[j - 1] == '?') {
                    curr[j] = prev[j - 1];
                }
            }
            prev = curr;
        }
        
        return prev[n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "String", "Greedy"],
  },
  {
    title: "LC 64 – Minimum Path Sum",
    description: "Find path from top-left to bottom-right with minimum sum.",
    leetcodeUrl: "https://leetcode.com/problems/minimum-path-sum/",
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 200", "0 <= grid[i][j] <= 200"],
    solutionRecursion: `class Solution {
public:
    int minPathHelper(vector<vector<int>>& grid, int i, int j) {
        if (i == 0 && j == 0) return grid[0][0];
        if (i < 0 || j < 0) return INT_MAX;
        
        int up = minPathHelper(grid, i - 1, j);
        int left = minPathHelper(grid, i, j - 1);
        
        return grid[i][j] + min(up, left);
    }
    
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        return minPathHelper(grid, m - 1, n - 1);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int minPathHelper(vector<vector<int>>& grid, int i, int j, vector<vector<int>>& dp) {
        if (i == 0 && j == 0) return grid[0][0];
        if (i < 0 || j < 0) return INT_MAX;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        int up = minPathHelper(grid, i - 1, j, dp);
        int left = minPathHelper(grid, i, j - 1, dp);
        
        return dp[i][j] = grid[i][j] + min(up, left);
    }
    
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return minPathHelper(grid, m - 1, n - 1, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) {
                    dp[i][j] = grid[i][j];
                } else {
                    int up = (i > 0) ? dp[i - 1][j] : INT_MAX;
                    int left = (j > 0) ? dp[i][j - 1] : INT_MAX;
                    dp[i][j] = grid[i][j] + min(up, left);
                }
            }
        }
        
        return dp[m - 1][n - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> prev(n, 0);
        
        for (int i = 0; i < m; i++) {
            vector<int> curr(n, 0);
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) {
                    curr[j] = grid[i][j];
                } else {
                    int up = (i > 0) ? prev[j] : INT_MAX;
                    int left = (j > 0) ? curr[j - 1] : INT_MAX;
                    curr[j] = grid[i][j] + min(up, left);
                }
            }
            prev = curr;
        }
        
        return prev[n - 1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Matrix"],
  },
  {
    title: "LC 198 – House Robber",
    description: "Rob houses without alerting police (adjacent houses have security).",
    leetcodeUrl: "https://leetcode.com/problems/house-robber/",
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    solutionRecursion: `class Solution {
public:
    int robHelper(vector<int>& nums, int idx) {
        if (idx >= nums.size()) return 0;
        
        int rob = nums[idx] + robHelper(nums, idx + 2);
        int skip = robHelper(nums, idx + 1);
        
        return max(rob, skip);
    }
    
    int rob(vector<int>& nums) {
        return robHelper(nums, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int robHelper(vector<int>& nums, int idx, vector<int>& dp) {
        if (idx >= nums.size()) return 0;
        
        if (dp[idx] != -1) return dp[idx];
        
        int rob = nums[idx] + robHelper(nums, idx + 2, dp);
        int skip = robHelper(nums, idx + 1, dp);
        
        return dp[idx] = max(rob, skip);
    }
    
    int rob(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, -1);
        return robHelper(nums, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        
        vector<int> dp(n, 0);
        dp[0] = nums[0];
        dp[1] = max(nums[0], nums[1]);
        
        for (int i = 2; i < n; i++) {
            dp[i] = max(nums[i] + dp[i - 2], dp[i - 1]);
        }
        
        return dp[n - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        
        int prev2 = nums[0];
        int prev1 = max(nums[0], nums[1]);
        
        for (int i = 2; i < n; i++) {
            int curr = max(nums[i] + prev2, prev1);
            prev2 = prev1;
            prev1 = curr;
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
    description: "Rob houses arranged in a circle (first and last are adjacent).",
    leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/",
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 1000"],
    solutionRecursion: `class Solution {
public:
    int robHelper(vector<int>& nums, int start, int end) {
        if (start > end) return 0;
        if (start == end) return nums[start];
        
        int rob = nums[start] + robHelper(nums, start + 2, end);
        int skip = robHelper(nums, start + 1, end);
        
        return max(rob, skip);
    }
    
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        
        return max(robHelper(nums, 0, n - 2), robHelper(nums, 1, n - 1));
    }
};`,
    solutionMemoization: `class Solution {
public:
    int robHelper(vector<int>& nums, int start, int end, vector<int>& dp) {
        if (start > end) return 0;
        if (start == end) return nums[start];
        
        if (dp[start] != -1) return dp[start];
        
        int rob = nums[start] + robHelper(nums, start + 2, end, dp);
        int skip = robHelper(nums, start + 1, end, dp);
        
        return dp[start] = max(rob, skip);
    }
    
    int robLinear(vector<int>& nums, int start, int end) {
        vector<int> dp(nums.size(), -1);
        return robHelper(nums, start, end, dp);
    }
    
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        
        return max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
    }
};`,
    solutionTabulation: `class Solution {
public:
    int robLinear(vector<int>& nums, int start, int end) {
        if (start == end) return nums[start];
        
        int prev2 = nums[start];
        int prev1 = max(nums[start], nums[start + 1]);
        
        for (int i = start + 2; i <= end; i++) {
            int curr = max(nums[i] + prev2, prev1);
            prev2 = prev1;
            prev1 = curr;
        }
        
        return prev1;
    }
    
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        if (n == 2) return max(nums[0], nums[1]);
        
        return max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int robLinear(vector<int>& nums, int start, int end) {
        if (start == end) return nums[start];
        
        int prev2 = nums[start];
        int prev1 = max(nums[start], nums[start + 1]);
        
        for (int i = start + 2; i <= end; i++) {
            int curr = max(nums[i] + prev2, prev1);
            prev2 = prev1;
            prev1 = curr;
        }
        
        return prev1;
    }
    
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        if (n == 2) return max(nums[0], nums[1]);
        
        return max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 152 – Maximum Product Subarray",
    description: "Find contiguous subarray with largest product.",
    leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/",
    constraints: ["1 <= nums.length <= 2 * 10^4", "-10 <= nums[i] <= 10"],
    solutionRecursion: `class Solution {
public:
    pair<int,int> maxProdHelper(vector<int>& nums, int idx) {
        if (idx == nums.size() - 1) return {nums[idx], nums[idx]};
        
        auto [prevMax, prevMin] = maxProdHelper(nums, idx + 1);
        
        int currMax = max({nums[idx], nums[idx] * prevMax, nums[idx] * prevMin});
        int currMin = min({nums[idx], nums[idx] * prevMax, nums[idx] * prevMin});
        
        return {currMax, currMin};
    }
    
    int maxProduct(vector<int>& nums) {
        int maxProd = nums[0];
        auto [maxVal, minVal] = maxProdHelper(nums, 0);
        
        for (int i = 0; i < nums.size(); i++) {
            auto [mx, mn] = maxProdHelper(nums, i);
            maxProd = max(maxProd, mx);
        }
        
        return maxProd;
    }
};`,
    solutionMemoization: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size();
        int maxProd = nums[0];
        int currMax = nums[0], currMin = nums[0];
        
        for (int i = 1; i < n; i++) {
            if (nums[i] < 0) swap(currMax, currMin);
            
            currMax = max(nums[i], currMax * nums[i]);
            currMin = min(nums[i], currMin * nums[i]);
            
            maxProd = max(maxProd, currMax);
        }
        
        return maxProd;
    }
};`,
    solutionTabulation: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size();
        vector<int> dpMax(n), dpMin(n);
        dpMax[0] = dpMin[0] = nums[0];
        int result = nums[0];
        
        for (int i = 1; i < n; i++) {
            dpMax[i] = max({nums[i], dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i]});
            dpMin[i] = min({nums[i], dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i]});
            result = max(result, dpMax[i]);
        }
        
        return result;
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int maxProd = nums[0];
        int currMax = nums[0], currMin = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            int temp = currMax;
            currMax = max({nums[i], currMax * nums[i], currMin * nums[i]});
            currMin = min({nums[i], temp * nums[i], currMin * nums[i]});
            maxProd = max(maxProd, currMax);
        }
        
        return maxProd;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 1277 – Count Square Submatrices",
    description: "Count square submatrices with all ones.",
    leetcodeUrl: "https://leetcode.com/problems/count-square-submatrices-with-all-ones/",
    constraints: ["1 <= arr.length <= 300", "1 <= arr[0].length <= 300", "0 <= arr[i][j] <= 1"],
    solutionRecursion: `class Solution {
public:
    int countHelper(vector<vector<int>>& matrix, int i, int j) {
        if (i >= matrix.size() || j >= matrix[0].size() || matrix[i][j] == 0) return 0;
        
        int right = countHelper(matrix, i, j + 1);
        int down = countHelper(matrix, i + 1, j);
        int diag = countHelper(matrix, i + 1, j + 1);
        
        return 1 + min({right, down, diag});
    }
    
    int countSquares(vector<vector<int>>& matrix) {
        int count = 0;
        for (int i = 0; i < matrix.size(); i++) {
            for (int j = 0; j < matrix[0].size(); j++) {
                if (matrix[i][j] == 1) {
                    count += countHelper(matrix, i, j);
                }
            }
        }
        return count;
    }
};`,
    solutionMemoization: `class Solution {
public:
    int countHelper(vector<vector<int>>& matrix, int i, int j, vector<vector<int>>& dp) {
        if (i >= matrix.size() || j >= matrix[0].size() || matrix[i][j] == 0) return 0;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        int right = countHelper(matrix, i, j + 1, dp);
        int down = countHelper(matrix, i + 1, j, dp);
        int diag = countHelper(matrix, i + 1, j + 1, dp);
        
        return dp[i][j] = 1 + min({right, down, diag});
    }
    
    int countSquares(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> dp(m, vector<int>(n, -1));
        int count = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1) {
                    count += countHelper(matrix, i, j, dp);
                }
            }
        }
        
        return count;
    }
};`,
    solutionTabulation: `class Solution {
public:
    int countSquares(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));
        int count = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1) {
                    if (i == 0 || j == 0) {
                        dp[i][j] = 1;
                    } else {
                        dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
                    }
                    count += dp[i][j];
                }
            }
        }
        
        return count;
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int countSquares(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<int> prev(n, 0);
        int count = 0;
        
        for (int i = 0; i < m; i++) {
            vector<int> curr(n, 0);
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1) {
                    if (i == 0 || j == 0) {
                        curr[j] = 1;
                    } else {
                        curr[j] = 1 + min({prev[j], curr[j-1], prev[j-1]});
                    }
                    count += curr[j];
                }
            }
            prev = curr;
        }
        
        return count;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Matrix"],
  },
  {
    title: "LC 1458 – Max Dot Product of Two Subsequences",
    description: "Find maximum dot product of non-empty subsequences.",
    leetcodeUrl: "https://leetcode.com/problems/max-dot-product-of-two-subsequences/",
    constraints: ["1 <= nums1.length, nums2.length <= 500", "-1000 <= nums1[i], nums2[i] <= 1000"],
    solutionRecursion: `class Solution {
public:
    int maxDotHelper(vector<int>& nums1, vector<int>& nums2, int i, int j) {
        if (i >= nums1.size() || j >= nums2.size()) return INT_MIN / 2;
        
        int take = nums1[i] * nums2[j] + max(0, maxDotHelper(nums1, nums2, i + 1, j + 1));
        int skip1 = maxDotHelper(nums1, nums2, i + 1, j);
        int skip2 = maxDotHelper(nums1, nums2, i, j + 1);
        
        return max({take, skip1, skip2});
    }
    
    int maxDotProduct(vector<int>& nums1, vector<int>& nums2) {
        return maxDotHelper(nums1, nums2, 0, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int maxDotHelper(vector<int>& nums1, vector<int>& nums2, int i, int j, 
                     vector<vector<int>>& dp) {
        if (i >= nums1.size() || j >= nums2.size()) return INT_MIN / 2;
        
        if (dp[i][j] != INT_MIN) return dp[i][j];
        
        int take = nums1[i] * nums2[j] + max(0, maxDotHelper(nums1, nums2, i + 1, j + 1, dp));
        int skip1 = maxDotHelper(nums1, nums2, i + 1, j, dp);
        int skip2 = maxDotHelper(nums1, nums2, i, j + 1, dp);
        
        return dp[i][j] = max({take, skip1, skip2});
    }
    
    int maxDotProduct(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        vector<vector<int>> dp(m, vector<int>(n, INT_MIN));
        return maxDotHelper(nums1, nums2, 0, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int maxDotProduct(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, INT_MIN / 2));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                int take = nums1[i-1] * nums2[j-1] + max(0, dp[i-1][j-1]);
                dp[i][j] = max({take, dp[i-1][j], dp[i][j-1]});
            }
        }
        
        return dp[m][n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int maxDotProduct(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        vector<int> prev(n + 1, INT_MIN / 2);
        
        for (int i = 1; i <= m; i++) {
            vector<int> curr(n + 1, INT_MIN / 2);
            for (int j = 1; j <= n; j++) {
                int take = nums1[i-1] * nums2[j-1] + max(0, prev[j-1]);
                curr[j] = max({take, prev[j], curr[j-1]});
            }
            prev = curr;
        }
        
        return prev[n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 97 – Interleaving String",
    description: "Check if s3 is formed by interleaving s1 and s2.",
    leetcodeUrl: "https://leetcode.com/problems/interleaving-string/",
    constraints: ["0 <= s1.length, s2.length <= 100", "0 <= s3.length <= 200"],
    solutionRecursion: `class Solution {
public:
    bool isInterleaveHelper(string& s1, string& s2, string& s3, int i, int j, int k) {
        if (k == s3.length()) return i == s1.length() && j == s2.length();
        
        bool matchS1 = (i < s1.length() && s1[i] == s3[k] && 
                        isInterleaveHelper(s1, s2, s3, i + 1, j, k + 1));
        bool matchS2 = (j < s2.length() && s2[j] == s3[k] && 
                        isInterleaveHelper(s1, s2, s3, i, j + 1, k + 1));
        
        return matchS1 || matchS2;
    }
    
    bool isInterleave(string s1, string s2, string s3) {
        if (s1.length() + s2.length() != s3.length()) return false;
        return isInterleaveHelper(s1, s2, s3, 0, 0, 0);
    }
};`,
    solutionMemoization: `class Solution {
public:
    bool isInterleaveHelper(string& s1, string& s2, string& s3, int i, int j, int k, 
                           vector<vector<int>>& dp) {
        if (k == s3.length()) return i == s1.length() && j == s2.length();
        
        if (dp[i][j] != -1) return dp[i][j];
        
        bool matchS1 = (i < s1.length() && s1[i] == s3[k] && 
                        isInterleaveHelper(s1, s2, s3, i + 1, j, k + 1, dp));
        bool matchS2 = (j < s2.length() && s2[j] == s3[k] && 
                        isInterleaveHelper(s1, s2, s3, i, j + 1, k + 1, dp));
        
        return dp[i][j] = matchS1 || matchS2;
    }
    
    bool isInterleave(string s1, string s2, string s3) {
        if (s1.length() + s2.length() != s3.length()) return false;
        int m = s1.length(), n = s2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, -1));
        return isInterleaveHelper(s1, s2, s3, 0, 0, 0, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        
        for (int i = 1; i <= m; i++) {
            dp[i][0] = dp[i-1][0] && s1[i-1] == s3[i-1];
        }
        
        for (int j = 1; j <= n; j++) {
            dp[0][j] = dp[0][j-1] && s2[j-1] == s3[j-1];
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                dp[i][j] = (dp[i-1][j] && s1[i-1] == s3[i+j-1]) || 
                           (dp[i][j-1] && s2[j-1] == s3[i+j-1]);
            }
        }
        
        return dp[m][n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        
        vector<bool> prev(n + 1, false);
        prev[0] = true;
        
        for (int j = 1; j <= n; j++) {
            prev[j] = prev[j-1] && s2[j-1] == s3[j-1];
        }
        
        for (int i = 1; i <= m; i++) {
            vector<bool> curr(n + 1, false);
            curr[0] = prev[0] && s1[i-1] == s3[i-1];
            
            for (int j = 1; j <= n; j++) {
                curr[j] = (prev[j] && s1[i-1] == s3[i+j-1]) || 
                          (curr[j-1] && s2[j-1] == s3[i+j-1]);
            }
            prev = curr;
        }
        
        return prev[n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 801 – Minimum Swaps To Make Sequences Increasing",
    description: "Find minimum swaps to make both arrays strictly increasing.",
    leetcodeUrl: "https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing/",
    constraints: ["2 <= nums1.length <= 10^5", "nums2.length == nums1.length", "0 <= nums1[i], nums2[i] <= 2 * 10^5"],
    solutionRecursion: `class Solution {
public:
    int minSwapHelper(vector<int>& nums1, vector<int>& nums2, int idx, bool swapped, 
                     int prev1, int prev2) {
        if (idx == nums1.size()) return 0;
        
        int n1 = nums1[idx], n2 = nums2[idx];
        if (swapped) swap(n1, n2);
        
        if (n1 <= prev1 || n2 <= prev2) return INT_MAX / 2;
        
        int keep = minSwapHelper(nums1, nums2, idx + 1, false, n1, n2);
        int swap = 1 + minSwapHelper(nums1, nums2, idx + 1, true, n1, n2);
        
        return min(keep, swap);
    }
    
    int minSwap(vector<int>& nums1, vector<int>& nums2) {
        return minSwapHelper(nums1, nums2, 0, false, -1, -1);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int minSwap(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        vector<vector<int>> dp(n, vector<int>(2, INT_MAX / 2));
        dp[0][0] = 0;
        dp[0][1] = 1;
        
        for (int i = 1; i < n; i++) {
            if (nums1[i] > nums1[i-1] && nums2[i] > nums2[i-1]) {
                dp[i][0] = min(dp[i][0], dp[i-1][0]);
                dp[i][1] = min(dp[i][1], dp[i-1][1] + 1);
            }
            
            if (nums1[i] > nums2[i-1] && nums2[i] > nums1[i-1]) {
                dp[i][0] = min(dp[i][0], dp[i-1][1]);
                dp[i][1] = min(dp[i][1], dp[i-1][0] + 1);
            }
        }
        
        return min(dp[n-1][0], dp[n-1][1]);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int minSwap(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        vector<vector<int>> dp(n, vector<int>(2, INT_MAX / 2));
        dp[0][0] = 0;
        dp[0][1] = 1;
        
        for (int i = 1; i < n; i++) {
            if (nums1[i] > nums1[i-1] && nums2[i] > nums2[i-1]) {
                dp[i][0] = min(dp[i][0], dp[i-1][0]);
                dp[i][1] = min(dp[i][1], dp[i-1][1] + 1);
            }
            
            if (nums1[i] > nums2[i-1] && nums2[i] > nums1[i-1]) {
                dp[i][0] = min(dp[i][0], dp[i-1][1]);
                dp[i][1] = min(dp[i][1], dp[i-1][0] + 1);
            }
        }
        
        return min(dp[n-1][0], dp[n-1][1]);
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int minSwap(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        int keep = 0, swap = 1;
        
        for (int i = 1; i < n; i++) {
            int newKeep = INT_MAX / 2, newSwap = INT_MAX / 2;
            
            if (nums1[i] > nums1[i-1] && nums2[i] > nums2[i-1]) {
                newKeep = min(newKeep, keep);
                newSwap = min(newSwap, swap + 1);
            }
            
            if (nums1[i] > nums2[i-1] && nums2[i] > nums1[i-1]) {
                newKeep = min(newKeep, swap);
                newSwap = min(newSwap, keep + 1);
            }
            
            keep = newKeep;
            swap = newSwap;
        }
        
        return min(keep, swap);
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 1278 – Palindrome Partitioning III",
    description: "Change minimum characters to divide string into k palindromic substrings.",
    leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning-iii/",
    constraints: ["1 <= k <= s.length <= 100", "s consists of lowercase English letters."],
    solutionRecursion: `class Solution {
public:
    int cost(string& s, int i, int j) {
        int changes = 0;
        while (i < j) {
            if (s[i++] != s[j--]) changes++;
        }
        return changes;
    }
    
    int palindromeHelper(string& s, int idx, int k) {
        if (k == 1) return cost(s, idx, s.length() - 1);
        if (idx >= s.length()) return INT_MAX / 2;
        
        int minChanges = INT_MAX / 2;
        for (int i = idx; i < s.length(); i++) {
            int currCost = cost(s, idx, i) + palindromeHelper(s, i + 1, k - 1);
            minChanges = min(minChanges, currCost);
        }
        
        return minChanges;
    }
    
    int palindromePartition(string s, int k) {
        return palindromeHelper(s, 0, k);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int cost(string& s, int i, int j) {
        int changes = 0;
        while (i < j) {
            if (s[i++] != s[j--]) changes++;
        }
        return changes;
    }
    
    int palindromeHelper(string& s, int idx, int k, vector<vector<int>>& dp) {
        if (k == 1) return cost(s, idx, s.length() - 1);
        if (idx >= s.length()) return INT_MAX / 2;
        
        if (dp[idx][k] != -1) return dp[idx][k];
        
        int minChanges = INT_MAX / 2;
        for (int i = idx; i < s.length(); i++) {
            int currCost = cost(s, idx, i) + palindromeHelper(s, i + 1, k - 1, dp);
            minChanges = min(minChanges, currCost);
        }
        
        return dp[idx][k] = minChanges;
    }
    
    int palindromePartition(string s, int k) {
        int n = s.length();
        vector<vector<int>> dp(n, vector<int>(k + 1, -1));
        return palindromeHelper(s, 0, k, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int palindromePartition(string s, int k) {
        int n = s.length();
        vector<vector<int>> cost(n, vector<int>(n, 0));
        
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int l = i, r = j, changes = 0;
                while (l < r) {
                    if (s[l++] != s[r--]) changes++;
                }
                cost[i][j] = changes;
            }
        }
        
        vector<vector<int>> dp(n + 1, vector<int>(k + 1, INT_MAX / 2));
        dp[0][0] = 0;
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= min(i, k); j++) {
                for (int m = j - 1; m < i; m++) {
                    dp[i][j] = min(dp[i][j], dp[m][j - 1] + cost[m][i - 1]);
                }
            }
        }
        
        return dp[n][k];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int palindromePartition(string s, int k) {
        int n = s.length();
        vector<vector<int>> cost(n, vector<int>(n, 0));
        
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int l = i, r = j, changes = 0;
                while (l < r) {
                    if (s[l++] != s[r--]) changes++;
                }
                cost[i][j] = changes;
            }
        }
        
        vector<int> prev(k + 1, INT_MAX / 2);
        prev[0] = 0;
        
        for (int i = 1; i <= n; i++) {
            vector<int> curr(k + 1, INT_MAX / 2);
            for (int j = 1; j <= min(i, k); j++) {
                for (int m = j - 1; m < i; m++) {
                    curr[j] = min(curr[j], prev[j - 1] + cost[m][i - 1]);
                }
            }
            prev = curr;
        }
        
        return prev[k];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 72 – Edit Distance (Full)",
    description: "Convert word1 to word2 using minimum operations (insert, delete, replace).",
    leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
    constraints: ["0 <= word1.length, word2.length <= 500", "word1 and word2 consist of lowercase English letters."],
    solutionRecursion: `class Solution {
public:
    int minDistanceHelper(string& word1, string& word2, int i, int j) {
        if (i == 0) return j;
        if (j == 0) return i;
        
        if (word1[i-1] == word2[j-1]) {
            return minDistanceHelper(word1, word2, i - 1, j - 1);
        }
        
        int insert = 1 + minDistanceHelper(word1, word2, i, j - 1);
        int del = 1 + minDistanceHelper(word1, word2, i - 1, j);
        int replace = 1 + minDistanceHelper(word1, word2, i - 1, j - 1);
        
        return min({insert, del, replace});
    }
    
    int minDistance(string word1, string word2) {
        return minDistanceHelper(word1, word2, word1.length(), word2.length());
    }
};`,
    solutionMemoization: `class Solution {
public:
    int minDistanceHelper(string& word1, string& word2, int i, int j, 
                         vector<vector<int>>& dp) {
        if (i == 0) return j;
        if (j == 0) return i;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        if (word1[i-1] == word2[j-1]) {
            return dp[i][j] = minDistanceHelper(word1, word2, i - 1, j - 1, dp);
        }
        
        int insert = 1 + minDistanceHelper(word1, word2, i, j - 1, dp);
        int del = 1 + minDistanceHelper(word1, word2, i - 1, j, dp);
        int replace = 1 + minDistanceHelper(word1, word2, i - 1, j - 1, dp);
        
        return dp[i][j] = min({insert, del, replace});
    }
    
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, -1));
        return minDistanceHelper(word1, word2, m, n, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i-1] == word2[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + min({dp[i][j-1], dp[i-1][j], dp[i-1][j-1]});
                }
            }
        }
        
        return dp[m][n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<int> prev(n + 1), curr(n + 1);
        
        for (int j = 0; j <= n; j++) prev[j] = j;
        
        for (int i = 1; i <= m; i++) {
            curr[0] = i;
            for (int j = 1; j <= n; j++) {
                if (word1[i-1] == word2[j-1]) {
                    curr[j] = prev[j-1];
                } else {
                    curr[j] = 1 + min({curr[j-1], prev[j], prev[j-1]});
                }
            }
            prev = curr;
        }
        
        return prev[n];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "String"],
  },
  {
    title: "LC 62 – Unique Paths",
    description: "Count unique paths from top-left to bottom-right in a grid.",
    leetcodeUrl: "https://leetcode.com/problems/unique-paths/",
    constraints: ["1 <= m, n <= 100"],
    solutionRecursion: `class Solution {
public:
    int uniquePathsHelper(int i, int j) {
        if (i == 0 && j == 0) return 1;
        if (i < 0 || j < 0) return 0;
        
        return uniquePathsHelper(i - 1, j) + uniquePathsHelper(i, j - 1);
    }
    
    int uniquePaths(int m, int n) {
        return uniquePathsHelper(m - 1, n - 1);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int uniquePathsHelper(int i, int j, vector<vector<int>>& dp) {
        if (i == 0 && j == 0) return 1;
        if (i < 0 || j < 0) return 0;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        return dp[i][j] = uniquePathsHelper(i - 1, j, dp) + uniquePathsHelper(i, j - 1, dp);
    }
    
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return uniquePathsHelper(m - 1, n - 1, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m, vector<int>(n, 0));
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) {
                    dp[i][j] = 1;
                } else {
                    int up = (i > 0) ? dp[i - 1][j] : 0;
                    int left = (j > 0) ? dp[i][j - 1] : 0;
                    dp[i][j] = up + left;
                }
            }
        }
        
        return dp[m - 1][n - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> prev(n, 0);
        
        for (int i = 0; i < m; i++) {
            vector<int> curr(n, 0);
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) {
                    curr[j] = 1;
                } else {
                    int up = (i > 0) ? prev[j] : 0;
                    int left = (j > 0) ? curr[j - 1] : 0;
                    curr[j] = up + left;
                }
            }
            prev = curr;
        }
        
        return prev[n - 1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Math", "Combinatorics"],
  },
  {
    title: "LC 63 – Unique Paths II",
    description: "Count unique paths with obstacles in the grid.",
    leetcodeUrl: "https://leetcode.com/problems/unique-paths-ii/",
    constraints: ["m == obstacleGrid.length", "n == obstacleGrid[i].length", "1 <= m, n <= 100", "obstacleGrid[i][j] is 0 or 1."],
    solutionRecursion: `class Solution {
public:
    int uniquePathsHelper(vector<vector<int>>& grid, int i, int j) {
        if (i < 0 || j < 0 || grid[i][j] == 1) return 0;
        if (i == 0 && j == 0) return 1;
        
        return uniquePathsHelper(grid, i - 1, j) + uniquePathsHelper(grid, i, j - 1);
    }
    
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size(), n = obstacleGrid[0].size();
        if (obstacleGrid[0][0] == 1 || obstacleGrid[m-1][n-1] == 1) return 0;
        return uniquePathsHelper(obstacleGrid, m - 1, n - 1);
    }
};`,
    solutionMemoization: `class Solution {
public:
    int uniquePathsHelper(vector<vector<int>>& grid, int i, int j, vector<vector<int>>& dp) {
        if (i < 0 || j < 0 || grid[i][j] == 1) return 0;
        if (i == 0 && j == 0) return 1;
        
        if (dp[i][j] != -1) return dp[i][j];
        
        return dp[i][j] = uniquePathsHelper(grid, i - 1, j, dp) + 
                          uniquePathsHelper(grid, i, j - 1, dp);
    }
    
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size(), n = obstacleGrid[0].size();
        if (obstacleGrid[0][0] == 1 || obstacleGrid[m-1][n-1] == 1) return 0;
        vector<vector<int>> dp(m, vector<int>(n, -1));
        return uniquePathsHelper(obstacleGrid, m - 1, n - 1, dp);
    }
};`,
    solutionTabulation: `class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size(), n = obstacleGrid[0].size();
        if (obstacleGrid[0][0] == 1 || obstacleGrid[m-1][n-1] == 1) return 0;
        
        vector<vector<int>> dp(m, vector<int>(n, 0));
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (obstacleGrid[i][j] == 1) {
                    dp[i][j] = 0;
                } else if (i == 0 && j == 0) {
                    dp[i][j] = 1;
                } else {
                    int up = (i > 0) ? dp[i - 1][j] : 0;
                    int left = (j > 0) ? dp[i][j - 1] : 0;
                    dp[i][j] = up + left;
                }
            }
        }
        
        return dp[m - 1][n - 1];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size(), n = obstacleGrid[0].size();
        if (obstacleGrid[0][0] == 1 || obstacleGrid[m-1][n-1] == 1) return 0;
        
        vector<int> prev(n, 0);
        
        for (int i = 0; i < m; i++) {
            vector<int> curr(n, 0);
            for (int j = 0; j < n; j++) {
                if (obstacleGrid[i][j] == 1) {
                    curr[j] = 0;
                } else if (i == 0 && j == 0) {
                    curr[j] = 1;
                } else {
                    int up = (i > 0) ? prev[j] : 0;
                    int left = (j > 0) ? curr[j - 1] : 0;
                    curr[j] = up + left;
                }
            }
            prev = curr;
        }
        
        return prev[n - 1];
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Matrix"],
  },
  {
    title: "LC 746 – Min Cost Climbing Stairs",
    description: "Find minimum cost to reach the top of the floor.",
    leetcodeUrl: "https://leetcode.com/problems/min-cost-climbing-stairs/",
    constraints: ["2 <= cost.length <= 1000", "0 <= cost[i] <= 999"],
    solutionRecursion: `class Solution {
public:
    int minCostHelper(vector<int>& cost, int idx) {
        if (idx >= cost.size()) return 0;
        
        int oneStep = cost[idx] + minCostHelper(cost, idx + 1);
        int twoStep = cost[idx] + minCostHelper(cost, idx + 2);
        
        return min(oneStep, twoStep);
    }
    
    int minCostClimbingStairs(vector<int>& cost) {
        return min(minCostHelper(cost, 0), minCostHelper(cost, 1));
    }
};`,
    solutionMemoization: `class Solution {
public:
    int minCostHelper(vector<int>& cost, int idx, vector<int>& dp) {
        if (idx >= cost.size()) return 0;
        
        if (dp[idx] != -1) return dp[idx];
        
        int oneStep = cost[idx] + minCostHelper(cost, idx + 1, dp);
        int twoStep = cost[idx] + minCostHelper(cost, idx + 2, dp);
        
        return dp[idx] = min(oneStep, twoStep);
    }
    
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        vector<int> dp(n, -1);
        return min(minCostHelper(cost, 0, dp), minCostHelper(cost, 1, dp));
    }
};`,
    solutionTabulation: `class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        vector<int> dp(n + 1, 0);
        
        for (int i = 2; i <= n; i++) {
            dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
        }
        
        return dp[n];
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        int prev2 = 0, prev1 = 0;
        
        for (int i = 2; i <= n; i++) {
            int curr = min(prev1 + cost[i - 1], prev2 + cost[i - 2]);
            prev2 = prev1;
            prev1 = curr;
        }
        
        return prev1;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "EASY" as const,
    tags: ["DP", "Array"],
  },
  {
    title: "LC 1048 – Longest String Chain",
    description: "Find longest possible word chain from given list of words.",
    leetcodeUrl: "https://leetcode.com/problems/longest-string-chain/",
    constraints: ["1 <= words.length <= 1000", "1 <= words[i].length <= 16", "words[i] only consists of lowercase English letters."],
    solutionRecursion: `class Solution {
public:
    bool isPredecessor(string& s1, string& s2) {
        if (s1.length() + 1 != s2.length()) return false;
        
        int i = 0, j = 0, diff = 0;
        while (i < s1.length() && j < s2.length()) {
            if (s1[i] == s2[j]) {
                i++; j++;
            } else {
                j++;
                diff++;
            }
        }
        
        return diff + (s2.length() - j) <= 1;
    }
    
    int longestHelper(vector<string>& words, int idx) {
        int maxLen = 1;
        
        for (int i = idx + 1; i < words.size(); i++) {
            if (isPredecessor(words[idx], words[i])) {
                maxLen = max(maxLen, 1 + longestHelper(words, i));
            }
        }
        
        return maxLen;
    }
    
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](string& a, string& b) {
            return a.length() < b.length();
        });
        
        int result = 1;
        for (int i = 0; i < words.size(); i++) {
            result = max(result, longestHelper(words, i));
        }
        
        return result;
    }
};`,
    solutionMemoization: `class Solution {
public:
    bool isPredecessor(string& s1, string& s2) {
        if (s1.length() + 1 != s2.length()) return false;
        
        int i = 0, j = 0, diff = 0;
        while (i < s1.length() && j < s2.length()) {
            if (s1[i] == s2[j]) {
                i++; j++;
            } else {
                j++;
                diff++;
            }
        }
        
        return diff + (s2.length() - j) <= 1;
    }
    
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](string& a, string& b) {
            return a.length() < b.length();
        });
        
        unordered_map<string, int> dp;
        int maxLen = 1;
        
        for (string& word : words) {
            dp[word] = 1;
            for (int i = 0; i < word.length(); i++) {
                string prev = word.substr(0, i) + word.substr(i + 1);
                if (dp.count(prev)) {
                    dp[word] = max(dp[word], dp[prev] + 1);
                }
            }
            maxLen = max(maxLen, dp[word]);
        }
        
        return maxLen;
    }
};`,
    solutionTabulation: `class Solution {
public:
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](string& a, string& b) {
            return a.length() < b.length();
        });
        
        unordered_map<string, int> dp;
        int maxLen = 1;
        
        for (string& word : words) {
            dp[word] = 1;
            for (int i = 0; i < word.length(); i++) {
                string prev = word.substr(0, i) + word.substr(i + 1);
                if (dp.count(prev)) {
                    dp[word] = max(dp[word], dp[prev] + 1);
                }
            }
            maxLen = max(maxLen, dp[word]);
        }
        
        return maxLen;
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](string& a, string& b) {
            return a.length() < b.length();
        });
        
        unordered_map<string, int> dp;
        int maxLen = 1;
        
        for (string& word : words) {
            dp[word] = 1;
            for (int i = 0; i < word.length(); i++) {
                string prev = word.substr(0, i) + word.substr(i + 1);
                if (dp.count(prev)) {
                    dp[word] = max(dp[word], dp[prev] + 1);
                }
            }
            maxLen = max(maxLen, dp[word]);
        }
        
        return maxLen;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "MEDIUM" as const,
    tags: ["DP", "Array", "Hash Table", "String"],
  },
  {
    title: "LC 1092 – Shortest Common Supersequence",
    description: "Find shortest string that has both str1 and str2 as subsequences.",
    leetcodeUrl: "https://leetcode.com/problems/shortest-common-supersequence/",
    constraints: ["1 <= str1.length, str2.length <= 1000", "str1 and str2 consist of lowercase English letters."],
    solutionRecursion: `class Solution {
public:
    int lcsLength(string& s1, string& s2, int i, int j) {
        if (i < 0 || j < 0) return 0;
        
        if (s1[i] == s2[j]) {
            return 1 + lcsLength(s1, s2, i - 1, j - 1);
        }
        
        return max(lcsLength(s1, s2, i - 1, j), lcsLength(s1, s2, i, j - 1));
    }
    
    string shortestCommonSupersequence(string str1, string str2) {
        int m = str1.length(), n = str2.length();
        int lcsLen = lcsLength(str1, str2, m - 1, n - 1);
        return "";  // Requires LCS reconstruction
    }
};`,
    solutionMemoization: `class Solution {
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int m = str1.length(), n = str2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (str1[i-1] == str2[j-1]) {
                    dp[i][j] = 1 + dp[i-1][j-1];
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        
        string result = "";
        int i = m, j = n;
        
        while (i > 0 && j > 0) {
            if (str1[i-1] == str2[j-1]) {
                result = str1[i-1] + result;
                i--; j--;
            } else if (dp[i-1][j] > dp[i][j-1]) {
                result = str1[i-1] + result;
                i--;
            } else {
                result = str2[j-1] + result;
                j--;
            }
        }
        
        while (i > 0) result = str1[--i] + result;
        while (j > 0) result = str2[--j] + result;
        
        return result;
    }
};`,
    solutionTabulation: `class Solution {
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int m = str1.length(), n = str2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (str1[i-1] == str2[j-1]) {
                    dp[i][j] = 1 + dp[i-1][j-1];
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        
        string result = "";
        int i = m, j = n;
        
        while (i > 0 && j > 0) {
            if (str1[i-1] == str2[j-1]) {
                result = str1[i-1] + result;
                i--; j--;
            } else if (dp[i-1][j] > dp[i][j-1]) {
                result = str1[i-1] + result;
                i--;
            } else {
                result = str2[j-1] + result;
                j--;
            }
        }
        
        while (i > 0) result = str1[--i] + result;
        while (j > 0) result = str2[--j] + result;
        
        return result;
    }
};`,
    solutionSpaceOptimized: `class Solution {
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int m = str1.length(), n = str2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (str1[i-1] == str2[j-1]) {
                    dp[i][j] = 1 + dp[i-1][j-1];
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        
        string result = "";
        int i = m, j = n;
        
        while (i > 0 && j > 0) {
            if (str1[i-1] == str2[j-1]) {
                result = str1[i-1] + result;
                i--; j--;
            } else if (dp[i-1][j] > dp[i][j-1]) {
                result = str1[i-1] + result;
                i--;
            } else {
                result = str2[j-1] + result;
                j--;
            }
        }
        
        while (i > 0) result = str1[--i] + result;
        while (j > 0) result = str2[--j] + result;
        
        return result;
    }
};`,
    category: "DYNAMIC_PROGRAMMING" as const,
    difficulty: "HARD" as const,
    tags: ["DP", "String"],
  },
]

async function seed() {
  try {
    console.log('Seeding database...')
    
    // Clear existing data
    await db.delete(problems)
    console.log('Cleared existing problems')

    // Insert new data
    await db.insert(problems).values(problemsData)
    console.log(`Inserted ${problemsData.length} problems`)

    console.log('Seeding completed successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await client.end()
  }
}

seed()
