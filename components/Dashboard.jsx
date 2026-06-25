import React, { useState, useEffect } from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-4 w-16 bg-gray-700 rounded"></div>
        <div className="h-3 w-10 bg-gray-700 rounded"></div>
      </div>

      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>

      <div className="mt-8">
        <div className="h-6 w-24 bg-gray-700 rounded"></div>
        <div className="h-3 w-28 bg-gray-700 rounded mt-3"></div>
      </div>
    </div>
  );
};

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  // Category Filter State
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Generation States
  const [generating, setGenerating] = useState(false);
  const [generateLimit, setGenerateLimit] = useState(100);
  const [generateSuccess, setGenerateSuccess] = useState(false);

  // Pagination States
  const [cursorHistory, setCursorHistory] = useState([null]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextPageCursor, setNextPageCursor] = useState(null);

  useEffect(() => {
    fetchProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, selectedCategory]);

  const fetchProducts = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    setError(null);

    try {
      const currentCursor = cursorHistory[currentIndex];
      let url = "https://intern-assignment-task.vercel.app/alldata";
      
      // Build URL Parameters
      const params = new URLSearchParams();

      if (currentCursor) {
        params.append("cursorDate", currentCursor.cursorDate);
        params.append("cursorId", currentCursor.cursorId);
      }

      // Apply category filter if not "All"
      if (selectedCategory !== "All") {
        params.append("categoryfilter", selectedCategory);
      }

      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
        setNextPageCursor(result.nextCursor);
      } else {
        setError(result.error || "Failed to fetch data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      if (showLoading) {
        setLoading(false);
      } else {
        setRefreshing(false);
      }
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // Reset pagination to the first page when category changes
    setCursorHistory([null]);
    setCurrentIndex(0);
    setNextPageCursor(null);
  };

  const handleGenerateData = async () => {
    if (!generateLimit || generateLimit <= 0) return;
    
    setGenerating(true);
    setGenerateSuccess(false);

    try {
      await fetch(`https://intern-assignment-task.vercel.app/generate?limit=${generateLimit}`);
      
      // Successfully generated in the background! 
      // Show the success checkmark for 3 seconds, but don't disrupt the user's current view.
      setGenerateSuccess(true);
      setTimeout(() => {
        setGenerateSuccess(false);
      }, 3000);

    } catch (err) {
      alert("Failed to generate data: " + err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleNextPage = () => {
    if (nextPageCursor) {
      if (currentIndex === cursorHistory.length - 1) {
        setCursorHistory([...cursorHistory, nextPageCursor]);
      }
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-950 text-gray-100 flex flex-col p-4 sm:p-6 overflow-hidden font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 shrink-0 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Product Dashboard
          </h1>

          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-gray-400">
              Inventory Management System
            </p>

            {refreshing && (
              <span className="text-xs text-blue-400 animate-pulse">
                Updating...
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Category Filter Dropdown */}
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 px-3 py-1.5 rounded-lg">
            <label htmlFor="category" className="text-sm text-gray-400">
              Category:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              disabled={loading || generating}
              className="bg-transparent text-white text-sm focus:outline-none cursor-pointer disabled:opacity-50"
            >
              <option className="bg-gray-900 text-white" value="All">All / Default</option>
              <option className="bg-gray-900 text-white" value="Electronics">Electronics</option>
              <option className="bg-gray-900 text-white" value="Fashion">Fashion</option>
              <option className="bg-gray-900 text-white" value="Books">Books</option>
              <option className="bg-gray-900 text-white" value="Furniture">Furniture</option>
              <option className="bg-gray-900 text-white" value="Sports">Sports</option>
            </select>
          </div>

          <div className="hidden md:block w-px h-8 bg-gray-800"></div>

          {/* Generate Controls */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={generateLimit}
              onChange={(e) => setGenerateLimit(e.target.value)}
              disabled={generating}
              placeholder="Qty"
              className="w-20 bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
            />
            <button
              onClick={handleGenerateData}
              disabled={generating || !generateLimit || generateLimit <= 0}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 whitespace-nowrap text-white ${
                generateSuccess 
                  ? "bg-blue-600 hover:bg-blue-500" 
                  : "bg-emerald-600 hover:bg-emerald-500"
              }`}
            >
              {generating ? "Generating..." : generateSuccess ? "✓ Added!" : "+ Generate"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 text-red-400 p-3 rounded-lg border border-red-800 mb-4 shrink-0 text-sm">
          <span className="font-semibold">Error:</span> {error}
        </div>
      )}

      <div className="flex-1 min-h-0 w-full">
        {loading ? (
          <div className="h-full grid grid-cols-2 lg:grid-cols-5 grid-rows-5 lg:grid-rows-2 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="h-full grid grid-cols-2 lg:grid-cols-5 grid-rows-5 lg:grid-rows-2 gap-4 overflow-y-auto pr-2 pb-2">
            {products.length === 0 ? (
              <div className="col-span-full h-full flex items-center justify-center text-gray-500">
                No products found in this category.
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900 rounded-xl border border-gray-800 p-4 flex flex-col justify-between hover:border-gray-700 transition-colors shadow-lg"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-900/50 text-blue-400 uppercase tracking-wider">
                        {product.category}
                      </span>

                      <span className="text-[10px] text-gray-500 font-mono">
                        #{product.id}
                      </span>
                    </div>

                    <h3
                      className="text-sm font-semibold text-gray-200 line-clamp-2"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-2">
                    <div className="text-xl font-bold text-emerald-400">
                      $
                      {parseFloat(product.price).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>

                    <div className="text-[10px] text-gray-600 mt-1">
                      Updated:{" "}
                      {new Date(product.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="shrink-0 mt-6 bg-gray-900 px-5 py-3 rounded-xl border border-gray-800 flex items-center justify-between shadow-lg">
        <p className="text-sm text-gray-400 font-medium">
          Page {currentIndex + 1}
        </p>

        <div className="flex gap-3">
          <button
            onClick={handlePrevPage}
            disabled={currentIndex === 0 || loading}
            className="px-4 py-1.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 disabled:opacity-30 transition-colors"
          >
            Previous
          </button>

          <button
            onClick={handleNextPage}
            disabled={!nextPageCursor || loading}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-30 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;