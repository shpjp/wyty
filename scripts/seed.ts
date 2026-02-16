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
