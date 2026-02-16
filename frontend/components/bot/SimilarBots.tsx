export function SimilarBots() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">
          Similar Strategies
        </h3>
        <a
          className="text-[#ff6a00] text-xs font-bold hover:underline cursor-pointer"
          href="#"
        >
          View All
        </a>
      </div>
      {/* Bot Card 1 */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-3 rounded flex items-center gap-3 hover:border-gray-500 transition-colors group cursor-pointer">
        <div
          className="w-10 h-10 rounded bg-cover bg-center border border-gray-200 dark:border-[#333333]"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8ntM4zRfxS0lKZufe2mNlSdACxJJXWDnID6C5x06d5O03NU2DbpfeSkEQD8wsASqdBN1W4EAgI2dkd_fbDhtYiTIN_CPy3WSIRy_G9pfSlFxhBZAc_ewXzeU37Lq6Gf7uetCPbzFFKvWxvghIMQrfUdqcRPYIjojwwXgaTrZxGj7NiRTy28dGKxruCnB2OQIEq3F7L2ySryq3xtfRyZCYG5W17lp5ArIsPg5nw66eRHu8fzDT1m0-Fv-KTOyEdw_8xuMXi5gbbw')",
          }}
        ></div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <p className="text-slate-900 dark:text-white text-sm font-bold truncate">
              Alpha Seeker
            </p>
            <p className="text-[#00ff41] text-xs font-mono font-bold">+24%</p>
          </div>
          <p className="text-gray-500 text-xs truncate">Politics • High Risk</p>
        </div>
        <div className="w-16 h-8">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 50 20"
          >
            <path
              d="M0 15 L10 12 L20 16 L30 5 L40 8 L50 2"
              fill="none"
              stroke="#00ff41"
              strokeWidth="1.5"
            ></path>
          </svg>
        </div>
      </div>
      {/* Bot Card 2 */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-3 rounded flex items-center gap-3 hover:border-gray-500 transition-colors group cursor-pointer">
        <div
          className="w-10 h-10 rounded bg-cover bg-center border border-gray-200 dark:border-[#333333]"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXjyTGlAQOHDHxotuPp5_vMN4CsVdpOBv2lUqNsnLKhKjCjGGNQPWfH-gCUrjWcgduxpYcqw-KQlFZSi4vRb53WY7dfzWJ_sjkgfUy9QD5d3GjBi56iv9igs5o95fSbnMK9A8SYSnwwgU8oW6R6C5sEHk9uKy2S3Se4_-yP1xgc4jFWVZ87A-Zfy9Swrfh8nIW9cRtP-u8SSTT8yzE8K-oWvBwMuIKoR10EiVDQi2ADC_RE7_nXt-j7l-qk9-TpC1Qm4jeXN506A')",
          }}
        ></div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <p className="text-slate-900 dark:text-white text-sm font-bold truncate">
              Quant Edge
            </p>
            <p className="text-[#00ff41] text-xs font-mono font-bold">+12%</p>
          </div>
          <p className="text-gray-500 text-xs truncate">Crypto • Med Risk</p>
        </div>
        <div className="w-16 h-8">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 50 20"
          >
            <path
              d="M0 18 L10 15 L20 12 L30 14 L40 10 L50 5"
              fill="none"
              stroke="#00ff41"
              strokeWidth="1.5"
            ></path>
          </svg>
        </div>
      </div>
      {/* Bot Card 3 */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-3 rounded flex items-center gap-3 hover:border-gray-500 transition-colors group cursor-pointer">
        <div
          className="w-10 h-10 rounded bg-cover bg-center border border-gray-200 dark:border-[#333333]"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAS-8Y2WoOFGQJkFaMzwdaGvrfRKNoIhLAu69BucpF-r1DzafpHSDKWHMRmAgoKv46gF2WZ5IcCfw1JUTb8isuy-q82v8Jwr3kjq5WZxT_5XUQ9OQHDwv8LzKVdPkd7hKfcO6S9cDRe09MOY_1jyGo8z3nHKPCaJoQ-CmmzlOPvXLRBkVC_fqZ45F2RPaN1lin4qx19Ocso8ZpfmGAWLA_HUmtHNzk0_VFIzUsPS2q743zkCqx8M8qFRExMzpYa5n5xrFEPcgmQpQ')",
          }}
        ></div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <p className="text-slate-900 dark:text-white text-sm font-bold truncate">
              News Sniper
            </p>
            <p className="text-[#ff3b30] text-xs font-mono font-bold">-2%</p>
          </div>
          <p className="text-gray-500 text-xs truncate">News • Low Risk</p>
        </div>
        <div className="w-16 h-8">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 50 20"
          >
            <path
              d="M0 5 L10 8 L20 4 L30 10 L40 12 L50 15"
              fill="none"
              stroke="#ff3b30"
              strokeWidth="1.5"
            ></path>
          </svg>
        </div>
      </div>
      {/* Bot Card 4 */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-3 rounded flex items-center gap-3 hover:border-gray-500 transition-colors group cursor-pointer">
        <div
          className="w-10 h-10 rounded bg-cover bg-center border border-gray-200 dark:border-[#333333]"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAo3h6LW68oTN2_0L0Pff2ry96xgYz-V9cjDLTNuhkcFfth-Wu9LIqDbMeJupj-4_Xf-NG2wf9PvD1alXEu2FNI8SFxrnlB19ChMXEr0XxuPpxqMoCd9dZ71KQz4IA8KGHXMAO0J8shUeWaQOOqMEW2xzwEwkt_uwX9o9G8i96O2p6XCUNl7bekl1J2UB8tQm_6991LU06oMrLPrrpd9MFnvMYJmtW-anxstuj9e6fcVEETYyFQTM0I8RWp1EuCkS9OfVotaaVugQ')",
          }}
        ></div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <p className="text-slate-900 dark:text-white text-sm font-bold truncate">
              Macro Trend
            </p>
            <p className="text-[#00ff41] text-xs font-mono font-bold">+8%</p>
          </div>
          <p className="text-gray-500 text-xs truncate">Econ • Med Risk</p>
        </div>
        <div className="w-16 h-8">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 50 20"
          >
            <path
              d="M0 10 L10 10 L20 8 L30 8 L40 5 L50 3"
              fill="none"
              stroke="#00ff41"
              strokeWidth="1.5"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
