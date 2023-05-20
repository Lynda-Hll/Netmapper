import React from "react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"

export default function Accueil() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    mail: "",
    message: "",
  })
  const router = useRouter()
  const handleNavigate = () => {
    localStorage.setItem("identifiant", "")
    localStorage.setItem("nom", "anonyme")
    localStorage.setItem("prenom", " ")

    router.push("/scan")
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Request failed!")
      }

      router.push("/")

      setFormData({
        nom: "",
        prenom: "",
        mail: "",
        message: "",
      })
    } catch (error) {
      return
    }
  }

  return (
    <div className="bg-gray-100">
      <header className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold ml-4">Netmapper</h1>
        </div>
        <nav>
          <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1">
            <Link
              href="/connexion"
              className="whitespace-nowrap text-base font-medium text-white-500 hover:text-gray-500"
            >
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Inscription
            </Link>
          </div>
        </nav>
      </header>
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex justify-start lg:w-0 lg:flex-1 ml-auto">
              <button
                onClick={() => handleNavigate()}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Essayez sans connexion
              </button>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Bienvenue sur Netmapper
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Netmapper est un outil de cartographie réseau pour visualiser
                les équipements connectés à votre réseau informatique en temps
                réel et leur interconnexion.
              </p>
            </div>
          </div>
        </div>
        <div id="fonctionnalites" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Les fonctionnalités de Netmapper
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Netmapper vous permet de découvrir les équipements connectés à
                votre réseau et leur interconnexion, de détecter les anomalies
                et d'optimiser la gestion de votre réseau ainsi que identifier
                les problèmes de connectivité et de sécurité de votre réseau
                pour les résoudre rapidement.
              </p>
            </div>
            <div className="mt-10"></div>
          </div>
        </div>

        <div className="flex items-center justify-center"></div>
        <div id="contact" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Nous contacter
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Si vous avez des questions ou des commentaires sur Netmapper,
                n'hésitez pas à nous contacter.
              </p>
            </div>
            <div className="mt-10">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Prénom
                          </label>
                          <input
                            id="prenom"
                            name="prenom"
                            type="text"
                            value={formData.prenom}
                            onChange={(e) => handleChange(e)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nom
                          </label>
                          <input
                            id="nom"
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={(e) => handleChange(e)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Adresse email
                          </label>
                          <input
                            id="mail"
                            type="mail"
                            name="mail"
                            value={formData.mail}
                            onChange={(e) => handleChange(e)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            type="message"
                            placeholder="Vuillez saisir votre message ici ..."
                            value={formData.message}
                            onChange={(e) => handleChange(e)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          ></textarea>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Envoyer
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
