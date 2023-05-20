import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-4xl font-bold ml-4">Netmapper</h1>
      </div>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/scan" className="hover:text-gray-400">
              Scan
            </Link>
          </li>
          <li>
            <Link href="/historique" className="hover:text-gray-400">
              Historique
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
