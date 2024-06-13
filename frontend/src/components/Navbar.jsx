import React, { useState } from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false)
    const user = useSelector(state=>state.auth.user)
    return (
        <nav className='flex itesms-center justify-between py-2 px-4 border-b'>
            <div className='flex items-center gap-4'>
                <Link to={"/"}>
                    <svg width={120} height={27} viewBox="0 0 120 27" fill="none">
                        <mask
                            id="logo-wordmark-pride_svg__a"
                            maskUnits="userSpaceOnUse"
                            x={1}
                            y={0}
                            width={119}
                            height={27}
                            style={{ maskType: "alpha" }}
                        >
                            <path
                                d="M29.69 2.36h.03v-.29h-7.26L15.7 18.05 8.96 2.07H1.12v.28l.04.01c1.32.3 2 .75 2 2.37v19c0 1.62-.68 2.07-2 2.37h-.04v.29h5.31v-.28H6.4c-1.33-.3-2-.76-2-2.38V5.83l8.67 20.56h.5l8.91-21.13V24.2c-.1 1.28-.78 1.67-1.98 1.95h-.03v.28h9.25v-.27l-.03-.01c-1.2-.28-1.89-.67-2-1.95V4.73c0-1.62.67-2.07 2-2.37zm4.23 12.58c.15-3.41 1.37-5.87 3.4-5.92.64.01 1.17.22 1.58.62.87.86 1.28 2.64 1.22 5.3h-6.2zm-.1.96h10.86v-.04c-.03-2.61-.78-4.64-2.23-6.03a7.3 7.3 0 0 0-5.05-1.87h-.04a7.31 7.31 0 0 0-5.75 2.78 10.4 10.4 0 0 0-2.08 5.72l-.02.2a7.61 7.61 0 0 0-.02.56v.58c.11 5.09 2.84 9.16 7.69 9.16 4.25 0 6.73-3.14 7.35-7.34l-.32-.11c-1.08 2.26-3.03 3.63-5.25 3.46-3.03-.23-5.35-3.32-5.13-7.06m23.12 6.89c-.36.85-1.1 1.32-2.1 1.32s-1.9-.7-2.55-1.94a12.23 12.23 0 0 1-1.06-5.49c0-4.68 1.45-7.7 3.68-7.7.94 0 1.68.47 2.03 1.28V22.8zm7.2 3.33c-1.33-.31-2-.78-2-2.49V.96l-8.07 2.39v.3l.05-.01c1.11-.1 1.87.06 2.3.47.35.32.52.8.52 1.5v3.1a5.18 5.18 0 0 0-2.89-.75c-2.33 0-4.45.98-5.99 2.78-1.6 1.86-2.44 4.42-2.44 7.38 0 5.28 2.58 8.84 6.43 8.84a5.09 5.09 0 0 0 4.89-3.34v2.81h7.23v-.29h-.03zm6.9-22.09c0-1.65-1.23-2.9-2.87-2.9a2.87 2.87 0 0 0-2.9 2.9c0 1.63 1.27 2.9 2.9 2.9a2.82 2.82 0 0 0 2.88-2.9zm1.91 22.1c-1.32-.32-2-.8-2-2.5V8.01l-7.24 2.1v.28h.05c1.56.14 1.99.68 1.99 2.53v13.51H73v-.29h-.04zm18.54 0c-1.33-.32-2-.8-2-2.5V8.01l-6.89 2.02v.29h.04c1.28.14 1.65.71 1.65 2.56v9.88a2.48 2.48 0 0 1-2.2 1.4c-1.57 0-2.43-1.08-2.43-3.02V8.01l-7.24 2.1v.28h.04c1.57.14 2 .68 2 2.53v8.36c0 .58.05 1.16.15 1.74l.13.57c.61 2.21 2.22 3.37 4.73 3.37 2.13 0 4-1.33 4.82-3.4v2.88h7.23v-.3h-.03zm28.1.3v-.3h-.03c-1.44-.34-2-.97-2-2.26V13.25c0-3.31-1.85-5.3-4.95-5.3a5.08 5.08 0 0 0-4.9 3.37c-.58-2.17-2.25-3.36-4.73-3.36a4.7 4.7 0 0 0-4.61 3.1V8.02l-7.23 2v.3h.04c1.55.14 2 .7 2 2.49v13.63h6.74v-.29h-.03c-1.15-.28-1.52-.78-1.52-2.05V11.9c.3-.71.91-1.56 2.13-1.56 1.5 0 2.26 1.05 2.26 3.12v12.97h6.75v-.29h-.03c-1.15-.28-1.52-.78-1.52-2.05V13.25a7 7 0 0 0-.1-1.21c.32-.78.97-1.7 2.23-1.7 1.53 0 2.27 1.02 2.27 3.12v12.97h7.23z"
                                fill="#242424"
                            />
                        </mask>
                        <g
                            filter="url(#logo-wordmark-pride_svg__filter0_f_238_6555)"
                            mask="url(#logo-wordmark-pride_svg__a)"
                        >
                            <path
                                d="M42.3-64.7l-15.52-6.74L-24.62 47l15.53 6.74L42.3-64.7z"
                                fill="#000"
                            />
                            <path
                                d="M53.18-59.98L42.3-64.7-9.1 53.74l10.88 4.72 51.4-118.44z"
                                fill="#603917"
                            />
                            <path
                                d="M64.96-54.87l-11.78-5.11L1.78 58.46l11.79 5.11 51.4-118.44z"
                                fill="#71E2FD"
                            />
                            <path
                                d="M75.84-50.15l-10.88-4.72-51.4 118.44 10.89 4.72L75.84-50.15z"
                                fill="#FF9BC9"
                            />
                            <path
                                d="M86.71-45.43l-10.87-4.72L24.44 68.3l10.88 4.72 51.4-118.44z"
                                fill="#FF472F"
                            />
                            <path
                                d="M97.6-40.7L86.7-45.44 35.32 73.01l10.88 4.72L97.6-40.7z"
                                fill="#FF8312"
                            />
                            <path
                                d="M108.47-35.99L97.6-40.7 46.2 77.73l10.88 4.72 51.4-118.44z"
                                fill="#FFCE00"
                            />
                            <path
                                d="M120.25-30.88l-11.78-5.1-51.4 118.43 11.79 5.11 51.4-118.44z"
                                fill="#48E348"
                            />
                            <path
                                d="M131.13-26.16l-10.88-4.72L68.86 87.56l10.88 4.72 51.4-118.44z"
                                fill="#008EF0"
                            />
                            <path
                                d="M148.48-18.63l-17.35-7.53-51.4 118.44 17.35 7.53 51.4-118.44z"
                                fill="#9A50FC"
                            />
                        </g>
                        <defs>
                            <filter
                                id="logo-wordmark-pride_svg__filter0_f_238_6555"
                                x="-29.5"
                                y="-76.33"
                                width="182.87"
                                height="181.03"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur
                                    stdDeviation="2.45"
                                    result="effect1_foregroundBlur_238_6555"
                                />
                            </filter>
                        </defs>
                    </svg>
                </Link>
                <div className=' items-center gap-2 bg-gray-100 p-2 rounded-full hidden md:flex'>
                    <div>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.1 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.94-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .8-.79l-3.74-3.73A8.05 8.05 0 0 0 11.04 3v.01z"
                                fill="currentColor"
                            />
                        </svg>

                    </div>
                    <input type="text" placeholder='Search' className='bg-gray-100  h-full rounded-full bg-transparent  ' />
                </div>
            </div>

            <div className='flex items-center gap-8 text-gray-600'>
            <div className='md:hidden'>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.1 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.94-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .8-.79l-3.74-3.73A8.05 8.05 0 0 0 11.04 3v.01z"
                                fill="currentColor"
                            />
                        </svg>

                    </div>
                <Link className='hidden items-center md:flex'to={"/new-story"} >
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-label="Write">
                        <path
                            d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                            fill="currentColor"
                        />
                        <path
                            d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
                            stroke="currentColor"
                        />
                    </svg>

                    <span className='ml-2 text-sm'>Write</span>
                </Link>

                <div>
                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-label="Notifications"
                    >
                        <path
                            d="M15 18.5a3 3 0 1 1-6 0"
                            stroke="currentColor"
                            strokeLinecap="round"
                        />
                        <path
                            d="M5.5 10.53V9a6.5 6.5 0 0 1 13 0v1.53c0 1.42.56 2.78 1.57 3.79l.03.03c.26.26.4.6.4.97v2.93c0 .14-.11.25-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.93c0-.37.14-.71.4-.97l.03-.03c1-1 1.57-2.37 1.57-3.79z"
                            stroke="currentColor"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div className='cursor-pointer' onClick={()=>setIsOpen(!isOpen)}>
                    <img src={user?.profilePhoto} alt="profile pic" className='rounded-full w-8 border'/>
                </div>
            </div>
           {
            isOpen && <Menu/>
           }
        </nav>
    )
}

export default Navbar
