"use client"

import { useState } from "react"
import { Send, Sparkles, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: string
  intent?: string
  cached?: boolean
}

interface AIChatProps {
  initialMessages?: Message[]
  code?: string
  problemId?: string
}

export default function AIChat({ initialMessages = [], code, problemId }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError("")

    try {
      // Simulate AI response with mock data
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Generate contextual responses based on input
      let responseContent = ""
      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("dp") || lowerInput.includes("dynamic programming")) {
        responseContent = "Dynamic Programming is all about breaking down problems into smaller subproblems. Start with the base cases, identify the recurrence relation, and use memoization or tabulation. Practice problems like Fibonacci, Climbing Stairs, and Longest Common Subsequence to build your foundation."
      } else if (lowerInput.includes("bfs") || lowerInput.includes("dfs")) {
        responseContent = "BFS (Breadth-First Search) explores level by level using a queue - great for shortest path problems. DFS (Depth-First Search) goes deep using recursion or a stack - perfect for exploring all paths. BFS guarantees shortest path in unweighted graphs, while DFS uses less memory for deep trees."
      } else if (lowerInput.includes("graph")) {
        responseContent = "To master graphs: 1) Understand adjacency lists vs matrices, 2) Practice BFS/DFS traversals, 3) Learn topological sort, 4) Study shortest path algorithms (Dijkstra, Bellman-Ford), 5) Practice problems like Course Schedule, Number of Islands, and Clone Graph."
      } else if (lowerInput.includes("time complexity") || lowerInput.includes("quicksort")) {
        responseContent = "QuickSort has O(n log n) average time complexity and O(n²) worst case. It uses divide-and-conquer: pick a pivot, partition elements smaller/larger, recursively sort. Space complexity is O(log n) for recursion stack. It's faster than MergeSort in practice due to better cache locality."
      } else if (lowerInput.includes("array") || lowerInput.includes("two sum")) {
        responseContent = "For array problems, consider: 1) Two pointers for sorted arrays, 2) Hash maps for O(1) lookups, 3) Sliding window for subarrays, 4) Prefix sums for range queries. Two Sum is perfect for learning hash maps - store complements as you iterate!"
      } else if (lowerInput.includes("tree") || lowerInput.includes("binary")) {
        responseContent = "Binary tree problems often use recursion. Master these patterns: 1) Traversals (inorder, preorder, postorder), 2) Level-order with BFS, 3) Height/depth calculations, 4) Path problems, 5) BST properties. Practice: Maximum Depth, Validate BST, Lowest Common Ancestor."
      } else if (lowerInput.includes("string")) {
        responseContent = "String problems often involve: 1) Two pointers for palindromes, 2) Hash maps for anagrams, 3) Sliding window for substrings, 4) DP for subsequences. Common patterns: character frequency counting, pattern matching, and string manipulation."
      } else if (lowerInput.includes("linked list")) {
        responseContent = "Linked list techniques: 1) Fast/slow pointers for cycle detection, 2) Dummy nodes to simplify edge cases, 3) Reverse in-place for O(1) space, 4) Two pointers for finding middle. Practice: Reverse Linked List, Detect Cycle, Merge Two Lists."
      } else if (lowerInput.includes("help") || lowerInput.includes("stuck")) {
        responseContent = "When stuck: 1) Reread the problem carefully, 2) Work through examples by hand, 3) Think about similar problems you've solved, 4) Consider brute force first, then optimize, 5) Break it into smaller steps. What specific part is challenging you?"
      } else if (lowerInput.includes("interview") || lowerInput.includes("prepare")) {
        responseContent = "Interview prep strategy: 1) Master fundamentals (arrays, strings, hash maps), 2) Practice 2-3 problems daily, 3) Focus on patterns not memorization, 4) Do mock interviews, 5) Review mistakes thoroughly. Aim for 150-200 problems across all difficulty levels."
      } else {
        responseContent = "Great question! I'm here to help you improve your coding skills. I can assist with algorithms, data structures, problem-solving strategies, and interview preparation. Feel free to ask about specific topics like dynamic programming, graphs, trees, or any LeetCode problem you're working on!"
      }

      const aiMessage: Message = {
        role: "assistant",
        content: responseContent,
        timestamp: new Date().toISOString(),
        intent: "general_help",
        cached: false,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err: any) {
      console.error("Chat error:", err)
      setError("Sorry, I'm having trouble responding right now. Please try again.")

      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border border-gray-200 bg-gray-50 text-gray-800 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:backdrop-blur-xl"
                  }`}
              >
                {message.role === "assistant" && (
                  <div className="mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                      AI Mentor
                      {message.cached && " • Cached"}
                    </span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                {message.intent && (
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Intent: {message.intent.replace(/_/g, " ")}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-start"
          >
            <div className="max-w-[80%] rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                  AI Mentor is thinking...
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
          >
            {error}
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 dark:border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Ask your AI mentor anything..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-400 dark:backdrop-blur-xl"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white transition-all hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
