import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Online Shopping Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-black border-b border-gray-200 pb-2">
              ONLINE SHOPPING
            </h3>
            <ul className="space-y-3">
              {["Men", "Women", "Kids", "Home & Living", "Beauty", "Gift Cards"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-sm flex items-center"
                  >
                    <span className="mr-2">›</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Policies */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-black border-b border-gray-200 pb-2">
              CUSTOMER POLICIES
            </h3>
            <ul className="space-y-3">
              {[
                "Contact Us",
                "FAQ",
                "T&C",
                "Terms Of Use",
                "Track Orders",
                "Shipping",
                "Cancellation",
                "Returns",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-sm flex items-center"
                  >
                    <span className="mr-2">›</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience nufais App */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-black border-b border-gray-200 pb-2">
              EXPERIENCE NUFU APP ON MOBILE
            </h3>
            <div className="flex space-x-3 mb-8">
              <a
                href="#"
                className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.928 16.615c-.524 1.127-1.048 2.184-1.886 2.184-.837 0-1.048-.778-2.23-.778-1.188 0-1.398.778-2.231.778-.839 0-1.484-1.188-2.007-2.311-1.525-3.214-1.678-7.078-.698-9.093.633-1.311 1.764-2.135 2.985-2.135 1.188 0 1.938.778 2.925.778.969 0 1.566-.778 2.972-.778 1.064 0 2.197.711 2.842 1.932-2.471 1.355-2.067 4.892.328 5.815-.412 1.381-.968 2.756-1.57 3.975-1.665-.971-1.969-2.624-1.43-3.591z" />
                  <path d="M14.8 5.203c-.642.743-1.698 1.315-2.726 1.267-.138-1.235.44-2.522 1.094-3.256.719-.77 1.979-1.209 2.726-1.214.104 1.197-.336 2.468-1.094 3.203z" />
                </svg>
                iOS
              </a>
              <a
                href="#"
                className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.159 3.07c-.957.516-1.702 1.337-2.233 2.4-.466.93-.703 1.983-.722 3.156l-.001 6.831c.019 1.177.256 2.23.722 3.156.531 1.064 1.276 1.885 2.233 2.4 1.072.573 2.255.857 3.542.857s2.47-.284 3.541-.857c.957-.515 1.702-1.336 2.233-2.4.466-.927.703-1.979.723-3.152v-6.84c-.02-1.173-.257-2.225-.723-3.152-.531-1.064-1.276-1.885-2.233-2.4-1.072-.573-2.255-.857-3.541-.857s-2.47.284-3.541.858zm12.984 5.808l4.604-2.213c.365.55.66 1.171.88 1.858.28.87.422 1.78.422 2.737s-.142 1.867-.423 2.738c-.219.687-.515 1.307-.88 1.856l-4.603-2.212c.132-.2.236-.41.31-.622.117-.34.177-.708.177-1.11v-1.298c0-.403-.06-.77-.177-1.11-.074-.213-.178-.423-.31-.624zm.31 1.734v1.298c0 .232-.03.439-.087.621l3.52 1.692c.21-.36.383-.755.518-1.179.21-.655.315-1.352.315-2.082s-.105-1.427-.316-2.082c-.134-.424-.307-.819-.518-1.178l-3.52 1.692c.059.182.088.39.088.62zm-4.604-6.456c.639.342 1.196.827 1.666 1.452.521.696.89 1.494 1.09 2.395.057.251.09.504.101.759h-2.894c-.178 0-.348.032-.511.098-.164.066-.31.16-.442.282l-5.228-2.511c.799-.548 1.689-.97 2.658-1.266.926-.282 1.831-.428 2.69-.437.871.01 1.65.147 2.32.419.053.016.104.034.156.053.13.049.257.1.394.156zm-2.972 5.692h5.86v1.298h-5.86v-1.298zm5.697 3.385c-.2.9-.569 1.699-1.09 2.395-.47.627-1.027 1.112-1.666 1.452-.137.058-.264.11-.394.156-.052.02-.103.036-.155.053-.67.271-1.45.411-2.32.419-.86-.01-1.763-.157-2.685-.437-.973-.297-1.864-.719-2.663-1.266l5.228-2.511c.132.121.278.216.442.282.163.066.333.098.511.098h2.894c-.012.255-.044.507-.102.759z" />
                </svg>
                Android
              </a>
            </div>

            <h3 className="text-lg font-bold mb-4 text-black border-b border-gray-200 pb-2">
              KEEP IN TOUCH
            </h3>
            <div className="flex space-x-4 mt-4">
              {[
                {
                  name: "Facebook",
                  path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
                {
                  name: "Twitter",
                  path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                },
                {
                  name: "Instagram",
                  path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
                },
                {
                  name: "YouTube",
                  path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Original & Authentic section */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 mr-4 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-black">100% ORIGINAL</h3>
                  <p className="text-sm text-gray-600">
                    guarantee for all products
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 mr-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-black">EASY RETURNS</h3>
                  <p className="text-sm text-gray-600">
                    within 30 days of receiving
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-gray-600 text-sm mb-4 md:mb-0">
              © 2025 NUFU STORE.COM. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;