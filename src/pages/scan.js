import Header from "../pages/api/Header"
import { useState, useEffect } from "react"

export default function Scan() {
  const [nom, setNom] = useState()
  const [prenom, setPrenom] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    uidUser: "",
    ip: "",
    optionAnalyse: "",
    option: "",
    time: "",
    number: "",
    port: "",
    result: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    let p = { ...formData, uidUser: localStorage.getItem("identifiant") }
    setIsLoading(true)

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(p),
      })

      if (!response.ok) {
        throw new Error("Request failed!")
      }

      const data = await response.json()

      setFormData({
        ip: "",
        optionAnalyse: "",
        option: "",
        time: "",
        number: "",
        port: "",
        result: data.result,
      })

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (localStorage.getItem("nom")) {
      setNom(localStorage?.getItem("nom"))
    }

    if (localStorage.getItem("prenom")) {
      setPrenom(localStorage?.getItem("prenom"))
    }
  }, [])

  return (
    <div className="container mx-auto px-4">
      <Header />
      <div className="bg-gray-900 px-4 py-8">
        <div className="text-2xl font-bold text-white">
          {nom + " " + prenom}
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto rounded-lg shadow-lg p-6"
        >
          <h1 className="text-3xl font-bold text-white text-center my-6">
            Let's scan:
          </h1>

          <div className="mb-4">
            <label htmlFor="ip" className="block text-gray-300 font-bold mb-2">
              IP/Domaine:
            </label>
            <input
              type="text"
              id="ip"
              name="ip"
              value={formData.ip}
              onChange={handleChange}
              placeholder="Entrez une adresse IP ou un domaine"
              className="w-full bg-gray-800 text-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline placeholder-gray-400"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="optionAnalyse"
              className="block text-gray-300 font-bold mb-2"
            >
              Option d'analyse:
            </label>
            <select
              id="optionAnalyse"
              name="optionAnalyse"
              value={formData.optionAnalyse}
              onChange={handleChange}
              className="w-full bg-gray-800 text-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              <option value="">Choisissez une option de scan</option>
              <option value="-sS">-sS</option>
              <option value="-sU">-sU</option>
              <option value="-sN">-sN</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="option"
              className="block text-gray-300 font-bold mb-2"
            >
              Option :
            </label>
            <select
              id="option"
              name="option"
              value={formData.option}
              onChange={handleChange}
              className="w-full bg-gray-800 text-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              <option value="">
                Choisissez une option de timing et de performance
              </option>
              <option value="--max-retries">--max-retries</option>
              <option value="--host-timeout">--host-timeout</option>
              <option value="--scan-delay">--scan-delay</option>
            </select>
            {formData.option === "--host-timeout" ||
            formData.option === "--scan-delay" ? (
              <div className="mb-4">
                <label
                  htmlFor="time"
                  className="block text-gray-300 font-bold mb-2"
                >
                  time:
                </label>
                <input
                  type="text"
                  id="time"
                  name="time"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Entrez un time"
                  className="w-full bg-gray-800 text-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline placeholder-gray-400"
                />
              </div>
            ) : null}

            {formData.option === "--scan-delay" && (
              <div className="mb-4">
                <label
                  htmlFor="port"
                  className="block text-gray-300 font-bold mb-2"
                >
                  port:
                </label>
                <input
                  type="text"
                  id="port"
                  name="port"
                  value={formData.port}
                  onChange={handleChange}
                  placeholder="Entrez un port"
                  className="w-full bg-gray-800 text-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline placeholder-gray-400"
                />
              </div>
            )}

            {formData.option === "--max-retries" && (
              <div className="mb-4">
                <label
                  htmlFor="number"
                  className="block text-gray-300 font-bold mb-2"
                >
                  number:
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Entrez un nombre"
                  className="w-full bg-gray-800 text-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline placeholder-gray-400"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
            >
              {isLoading ? "Scanning..." : "Scanner"}
            </button>
          </div>

          {formData.result && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white text-center my-6 ">
                Résultats:
              </h2>
              <pre className="bg-gray-800 text-gray-300 py-4 px-4 rounded-lg overflow-hidden text-ellipsis whitespace-normal">
                {formData.result}
              </pre>
              <div className="text-green-500 text-center mt-2">
                Le scan est terminé.
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
