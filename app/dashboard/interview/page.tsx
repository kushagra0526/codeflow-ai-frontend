"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProblemCard from "@/components/problem-card"
import { Play, Clock, CheckCircle2, Sparkles, Lightbulb, RefreshCw } from "lucide-react"
import { Problem } from "@/lib/api"

// Problem bank with hints for different topics
const problemBank: Array<Problem & { hints: string[] }> = [
  {
    title: "Two Sum",
    difficulty: "Easy" as const,
    topics: ["Arrays", "Hash Table"],
    leetcode_id: "two-sum",
    estimated_time_minutes: 15,
    reason: "Build foundation in hash tables and array manipulation",
    hints: [
      "Think about what data structure would help you efficiently look up values you've seen before.",
      "Consider using a hash table to store numbers as you iterate through the array.",
      "For each number, check if (target - current number) exists in your hash table."
    ]
  },
  {
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy" as const,
    topics: ["Trees", "DFS", "Stack"],
    leetcode_id: "binary-tree-inorder-traversal",
    estimated_time_minutes: 20,
    reason: "Master tree traversal patterns - essential for all tree problems",
    hints: [
      "Inorder traversal visits nodes in this order: left subtree → root → right subtree.",
      "You can solve this recursively or iteratively using a stack.",
      "For iterative approach: go left as far as possible, then process node, then go right."
    ]
  },
  {
    title: "Valid Parentheses",
    difficulty: "Easy" as const,
    topics: ["Stack", "String"],
    leetcode_id: "valid-parentheses",
    estimated_time_minutes: 15,
    reason: "Learn stack-based pattern matching - crucial for many problems",
    hints: [
      "Use a stack to keep track of opening brackets.",
      "When you see a closing bracket, check if it matches the most recent opening bracket.",
      "At the end, the stack should be empty if all brackets are properly matched."
    ]
  },
  {
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy" as const,
    topics: ["Trees", "DFS", "BFS"],
    leetcode_id: "maximum-depth-of-binary-tree",
    estimated_time_minutes: 15,
    reason: "Understand recursive tree traversal and depth calculation",
    hints: [
      "Think recursively: the depth of a tree is 1 + max depth of its subtrees.",
      "Base case: if the node is null, return 0.",
      "You can also solve this with BFS level-order traversal."
    ]
  },
  {
    title: "Climbing Stairs",
    difficulty: "Easy" as const,
    topics: ["Dynamic Programming", "Math"],
    leetcode_id: "climbing-stairs",
    estimated_time_minutes: 20,
    reason: "Introduction to dynamic programming with a simple Fibonacci pattern",
    hints: [
      "At each step, you can reach it from either the previous step or two steps back.",
      "This is similar to the Fibonacci sequence: ways[i] = ways[i-1] + ways[i-2].",
      "You only need to keep track of the last two values, not the entire array."
    ]
  },
  {
    title: "Number of Islands",
    difficulty: "Medium" as const,
    topics: ["Graphs", "DFS", "BFS", "Matrix"],
    leetcode_id: "number-of-islands",
    estimated_time_minutes: 30,
    reason: "Master graph traversal in a grid - common interview pattern",
    hints: [
      "Each island is a connected component. Use DFS or BFS to explore each island.",
      "When you find a '1', increment your island count and mark all connected '1's as visited.",
      "You can mark cells as visited by changing them to '0' or using a separate visited set."
    ]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium" as const,
    topics: ["String", "Hash Table", "Sliding Window"],
    leetcode_id: "longest-substring-without-repeating-characters",
    estimated_time_minutes: 25,
    reason: "Learn the sliding window technique for substring problems",
    hints: [
      "Use two pointers to maintain a sliding window of unique characters.",
      "Use a hash set or map to track characters in the current window.",
      "When you find a duplicate, shrink the window from the left until it's unique again."
    ]
  },
  {
    title: "Coin Change",
    difficulty: "Medium" as const,
    topics: ["Dynamic Programming", "BFS"],
    leetcode_id: "coin-change",
    estimated_time_minutes: 30,
    reason: "Classic DP problem - learn bottom-up dynamic programming",
    hints: [
      "Use DP array where dp[i] = minimum coins needed to make amount i.",
      "For each amount, try using each coin and take the minimum.",
      "Initialize dp[0] = 0 and all others to infinity or amount + 1."
    ]
  },
  {
    title: "Course Schedule",
    difficulty: "Medium" as const,
    topics: ["Graphs", "DFS", "BFS", "Topological Sort"],
    leetcode_id: "course-schedule",
    estimated_time_minutes: 35,
    reason: "Learn cycle detection and topological sorting in directed graphs",
    hints: [
      "This is a cycle detection problem in a directed graph.",
      "Build an adjacency list from the prerequisites.",
      "Use DFS with three states: unvisited, visiting, visited. If you reach a 'visiting' node, there's a cycle."
    ]
  },
  {
    title: "Merge Intervals",
    difficulty: "Medium" as const,
    topics: ["Arrays", "Sorting"],
    leetcode_id: "merge-intervals",
    estimated_time_minutes: 25,
    reason: "Master interval problems - common in scheduling and calendar applications",
    hints: [
      "First, sort the intervals by their start time.",
      "Iterate through sorted intervals and merge overlapping ones.",
      "Two intervals overlap if the start of the second is <= end of the first."
    ]
  },
  {
    title: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium" as const,
    topics: ["Trees", "DFS"],
    leetcode_id: "lowest-common-ancestor-of-a-binary-tree",
    estimated_time_minutes: 30,
    reason: "Important tree problem using recursive thinking",
    hints: [
      "Use recursion: if current node is p or q, return it.",
      "Recursively search in left and right subtrees.",
      "If both subtrees return non-null, current node is the LCA. Otherwise, return the non-null one."
    ]
  },
  {
    title: "Word Break",
    difficulty: "Medium" as const,
    topics: ["Dynamic Programming", "String", "Hash Table"],
    leetcode_id: "word-break",
    estimated_time_minutes: 30,
    reason: "Practice DP with string segmentation",
    hints: [
      "Use DP where dp[i] = true if substring s[0...i] can be segmented.",
      "For each position i, check all possible last words ending at i.",
      "Use a hash set for O(1) word lookup."
    ]
  }
]

export default function InterviewPage() {
  const [problem, setProblem] = useState<Problem & { hints: string[] }>(problemBank[0])
  const [currentHint, setCurrentHint] = useState("")
  const [hintLevel, setHintLevel] = useState<1 | 2 | 3>(1)
  const [isStarted, setIsStarted] = useState(false)

  // Select a recommended problem on mount
  useEffect(() => {
    selectRecommendedProblem()
  }, [])

  const selectRecommendedProblem = () => {
    // Simulate getting user's weak topics (in real app, this would come from API)
    const weakTopics = ["Dynamic Programming", "Graphs", "Trees"]

    // Filter problems that match weak topics
    const relevantProblems = problemBank.filter(p =>
      p.topics.some(topic =>
        weakTopics.some(weak =>
          topic.toLowerCase().includes(weak.toLowerCase()) ||
          weak.toLowerCase().includes(topic.toLowerCase())
        )
      )
    )

    // If no relevant problems, use all problems
    const candidateProblems = relevantProblems.length > 0 ? relevantProblems : problemBank

    // Select a random problem from candidates
    const randomProblem = candidateProblems[Math.floor(Math.random() * candidateProblems.length)]
    setProblem(randomProblem)
    setCurrentHint("")
    setHintLevel(1)
    setIsStarted(false)
  }

  const handleGetHint = () => {
    if (problem.hints && hintLevel <= problem.hints.length) {
      setCurrentHint(problem.hints[hintLevel - 1])
      if (hintLevel < 3 && hintLevel < problem.hints.length) {
        setHintLevel((prev) => (prev + 1) as 1 | 2 | 3)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Simulator</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Practice coding interviews with AI-powered feedback
          </p>
        </div>
        <button
          onClick={selectRecommendedProblem}
          className="flex items-center gap-2 rounded-lg border border-purple-500 bg-white px-4 py-2 text-sm font-medium text-purple-600 transition-all hover:bg-purple-50 dark:border-purple-400 dark:bg-white/5 dark:text-purple-400 dark:hover:bg-white/10"
        >
          <RefreshCw className="h-4 w-4" />
          New Problem
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Current Problem</span>
            <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {problem.difficulty}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Topics</span>
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
            {problem.topics.slice(0, 2).join(", ")}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Est. Time</span>
            <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {problem.estimated_time_minutes} min
          </p>
        </div>
      </motion.div>

      {/* Problem Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
            Recommended for you based on your weak topics
          </span>
        </div>
        <ProblemCard
          title={problem.title}
          difficulty={problem.difficulty}
          description={problem.reason || `Practice problem focusing on ${problem.topics.join(", ")}`}
        />
      </motion.div>

      {/* Problem Details */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl"
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Problem Details
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Topics Covered:
            </h4>
            <div className="flex flex-wrap gap-2">
              {problem.topics.map((topic, index) => (
                <span
                  key={index}
                  className="rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                >
                  {topic.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              ))}
            </div>
          </div>

          {problem.reason && (
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Why this problem?
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{problem.reason}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <a
            href={`https://leetcode.com/problems/${problem.leetcode_id}/`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsStarted(true)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-purple-500/50"
          >
            <Play className="h-4 w-4" />
            {isStarted ? "Continue on LeetCode" : "Start on LeetCode"}
          </a>
          <button
            onClick={handleGetHint}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            <Lightbulb className="h-4 w-4" />
            Get Hint {hintLevel > 1 && `(Level ${hintLevel})`}
          </button>
        </div>
      </motion.div>

      {/* Hint Display */}
      {currentHint && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="rounded-xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 shadow-sm dark:border-yellow-500/20 dark:from-yellow-500/10 dark:to-orange-500/10 dark:backdrop-blur-xl"
        >
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Hint (Level {hintLevel - 1})
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{currentHint}</p>
        </motion.div>
      )}

      {/* AI Feedback Panel */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-sm dark:border-purple-500/20 dark:from-purple-500/10 dark:to-pink-500/10 dark:backdrop-blur-xl"
      >
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tips for Success</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Understand the Problem</p>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Read carefully and identify edge cases before coding
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Plan Your Approach</p>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Think about time and space complexity before implementing
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Test Thoroughly</p>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Verify your solution with multiple test cases
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
