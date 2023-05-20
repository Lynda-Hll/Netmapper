import { useState } from "react"
import { useRouter } from "next/router"

export default function Connexion() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = `/api/login?login=${formData.mail}
      &password=${formData.password}`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Request failed!")
      }

      const data = await response.json()
      localStorage.setItem("identifiant", data.result[0].uid)
      localStorage.setItem("nom", data.result[0].nom)
      localStorage.setItem("prenom", data.result[0].prenom)

      router.push("/scan")
      setFormData({
        mail: "",
        password: "",
      })
    } catch (error) {
      return
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 py-6 mb-4 max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mail"
            type="mail"
            placeholder="E-mail"
            value={formData.mail}
            name="mail"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mot de passe
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Connexion
          </button>
        </div>
      </form>
    </div>
  )
}
