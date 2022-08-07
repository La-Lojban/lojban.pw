import Link from 'next/link'
/* This example requires Tailwind CSS v2.0+ */
import { Popover, Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import { closeXicon } from '../lib/buttons'
import { header } from '../config/config'

// const profile = ['Your Profile', 'Settings', 'Sign out']

type TocItem = {
  name: string
  url: string
  depth: number
}

const buttonClass = `text-black in-toc hover:no-underline px-3 py-2 text-sm font-medium overflow-ellipsis`

export default function Header({ toc = [], path = '' }: { toc?: any, path?: string }) {
  const toc_list: TocItem[] = (toc.map((i: any) => ({ depth: i.depth, name: i.value, url: `${path}#${i.id}` })))
  const has_toc = toc_list.length > 0
  return (
    <Popover as="nav" className="sticky top-0 z-50 bg-deep-orange-400 shadow-md print:hidden">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/welcome">
                    <a>
                      <img
                        className="logo"
                        src="/vreji/img/lojbo.svg"
                        alt="Lojban logo"
                      />
                    </a>
                  </Link>

                </div>

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-3">
                    {header.map((item) =>
                      <Link href={item.url} key={item.url}>
                        <button className={`flex-shrink-0 bg-deep-orange-300 text-gray-100 text-base py-1 px-4 rounded shadow-md hover:bg-deep-orange-200 focus:outline-none`}>
                          {item.name}
                        </button>
                      </Link>
                    )}
                    {/* <div className="stork-wrapper">
                      <input data-stork="federalist" className="stork-input" />
                      <div data-stork="federalist-output" className="stork-output"></div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {profile.map((item) => (
                              <Menu.Item key={item}>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                               ms     {item}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div> */}
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="select-none bg-deep-orange-400 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-deep-orange-400 focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon id="xicon" className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </div>

          <Popover.Panel className="md:hidden bg-gray-100 shadow-lg">
            {/* favs */}
            <div className="px-2 pt-2 space-y-1 sm:px-3">
              {header.map((item) =>
                <Link href={item.url} key={item.url}>
                  <a onClick={() => {
                    closeXicon()
                  }} className={`block border-b last:border-b-0 hover:text-deep-orange-600 ${buttonClass}`}>
                    {item.name}
                  </a>
                </Link>
              )}
            </div>

            {/* title */}
            {has_toc && (
              <>
                <h1 className={`bg-gray-200 ${buttonClass}`}>Table of contents</h1>

                {/* toc */}
                <nav className="toc w-full md:w-1/5 p-2 bottom-0 md:top-20 h-48 md:h-screen font-medium text-sm overflow-ellipsis">
                  <div className="h-full px-2 pb-3 space-y-1 sm:px-3 overflow-y-auto">
                    {toc_list.map((item) =>
                      <Link href={item.url} key={item.url}>
                        <a onClick={() => {
                          closeXicon()
                        }} className={`block border-b hover:text-deep-orange-600 ${buttonClass} lme-ml-${(item.depth - 2) * 2}`}>
                          {item.name}
                        </a>
                      </Link>
                    )}
                  </div>
                </nav>
              </>
            )
            }

            {/* archive */}
            {/* <div className="px-2 pb-3 space-y-1 sm:px-3 h-4/5 overflow-y-auto">
              {toc_list.map((item) =>
                <Link href={item.url} key={item.name}>
                  <a onClick={() => {
                    closeXicon()
                  }} className={`bg-deep-orange-900 text-white block px-3 py-2 rounded-md text-base font-medium overflow-ellipsis ml-${(item.depth - 2)*2}`}>
                    {item.name}
                  </a>
                </Link>
              )}
            </div> */}
            {/* <div className="pt-4 pb-3 border-t border-deep-orange-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                  <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                </div>
                <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {profile.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div> */}
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}