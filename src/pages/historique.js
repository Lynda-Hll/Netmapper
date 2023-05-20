import Header from "../pages/api/Header"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function Historique() {
  const [formData, setFormData] = useState([])

  const router = useRouter()
  const { pathname } = router

  useEffect(() => {
    getHistorique()
  }, [pathname])

  const getHistorique = async () => {
    try {
      const identifiant = localStorage.getItem("identifiant")
      const response = await fetch(`/api/scan?identifiant=${identifiant}`)
      const data = await response.json()
      setFormData(data.result)
    } catch (error) {
      return
    }
  }

  return (
    <div className="container mx-auto px-4">
      <Header />
      <h1 className="text-3xl font-bold text-gray-800 my-6 text-center">
        Historique
      </h1>
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-700">
          {formData.map((item) => (
            <li key={item._id} className="p-4">
              <p className="text-gray-300">
                <span className="font-bold text-gray-200">Date:</span>{" "}
                {item.date}
                <br />
                <span className="font-bold text-gray-200">
                  Option d'analyse:
                </span>{" "}
                {item.optionAnalyse}
                <br />
                <span className="font-bold text-gray-200">Option:</span>{" "}
                {item.option}
                <br />
                <span className="font-bold text-gray-200">Résultat:</span>{" "}
                {item.result}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
