import { useState } from "react"
import { useRouter } from "next/router"

export default function Inscription() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    mail: "",
    password: "",
  })
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Request failed!")
      }

      router.push("/connexion")

      setFormData({
        nom: "",
        prenom: "",
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
        <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nom"
          >
            Nom
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nom"
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="prenom"
          >
            Prénom
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="prenom"
            name="prenom"
            type="text"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-4">
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
            name="mail"
            placeholder="E-mail"
            value={formData.mail}
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
            name="password"
            type="password"
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
            Inscription
          </button>
        </div>
      </form>
    </div>
  )
}
