import Container from './container'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { footer } from '../config/config'

const Footer = () => {
  return (
    <footer className="flex justify-center text-center bg-black text-indigo-100 p-4 mt-12">
      <Container>
        <ul className="footer flex flex-row text-xl justify-center mt-3">
          {footer.map(network => {
            return <li className="px-2 cursor:pointer hover:text-white transition duration-300" key={network.name}>
              <Link href={network.link || ''}>
                <a>
                  <FontAwesomeIcon className="w-8" icon={network.icon} />
                </a>
              </Link>
            </li>
          })}
        </ul>
      </Container>
    </footer>
  )
}

export default Footer
