"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function UpgradePaymentPage() {
  const router = useRouter()
  const [upgradeData, setUpgradeData] = useState<any>(null)
  const [copiedAmount, setCopiedAmount] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState(false)

  useEffect(() => {
    // Check if upgrade data exists
    const storedUpgradeData = localStorage.getItem("paygo-upgrade-data")

    if (!storedUpgradeData) {
      router.push("/upgrade")
      return
    }

    setUpgradeData(JSON.parse(storedUpgradeData))
  }, [router])

  const handleCopyAmount = () => {
    if (upgradeData) {
      navigator.clipboard.writeText(upgradeData.price.toString())
      setCopiedAmount(true)
      setTimeout(() => setCopiedAmount(false), 2000)
    }
  }

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("2076219357")
    setCopiedAccount(true)
    setTimeout(() => setCopiedAccount(false), 2000)
  }

  const handleConfirmPayment = () => {
    // Redirect to the confirming payment page
    router.push("/upgrade/confirming-payment")
  }

  if (!upgradeData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-300 p-4">
        <div className="flex items-center gap-2">
          <Link href="/upgrade">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-medium">Bank Transfer</h1>
        </div>
        <Link href="/dashboard" className="text-red-500 font-medium">
          Cancel
        </Link>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="w-16 h-16 bg-[#1a237e] rounded-full flex items-center justify-center">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border-2 border-orange-400"></div>
              <div className="absolute inset-1 rounded-full border-2 border-yellow-400 transform rotate-45"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">NGN {upgradeData.price.toLocaleString()}</div>
            <div className="text-gray-600">{upgradeData.name} Upgrade</div>
          </div>
        </div>

        <p className="text-center text-lg mb-6">Proceed to your bank app to complete this Transfer</p>

        <div className="border border-gray-300 rounded-md overflow-hidden mb-6">
          <div className="bg-gray-100 p-4 space-y-6">
            <div>
              <p className="text-gray-700 mb-1">Amount</p>
              <div className="flex items-center justify-between">
                <p className="font-bold">NGN {upgradeData.price.toLocaleString()}</p>
                <button onClick={handleCopyAmount} className="bg-orange-400 text-white px-3 py-1 rounded text-sm">
                  {copiedAmount ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div>
              <p className="text-gray-700 mb-1">Account Number</p>
              <div className="flex items-center justify-between">
                <p className="font-bold">2076219357</p>
                <button
                  onClick={handleCopyAccountNumber}
                  className="bg-orange-400 text-white px-3 py-1 rounded text-sm"
                >
                  {copiedAccount ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div>
              <p className="text-gray-700 mb-1">Bank Name</p>
              <p className="font-bold">KUDA MFB</p>
            </div>

            <div>
              <p className="text-gray-700 mb-1">Account Name</p>
              <p className="font-bold">Nwite sabastine Ebuka</p>
            </div>
          </div>

          <div className="p-4 border-t border-gray-300">
            <p className="mb-4">Make Payment to the Account Above to upgrade your account level</p>

            <button
              onClick={handleConfirmPayment}
              className="w-full bg-orange-400 hover:bg-orange-500 text-black py-3 font-medium"
            >
              I have made this bank Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
