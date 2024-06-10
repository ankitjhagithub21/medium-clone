import React from 'react'

const Blog = () => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
                <img src="https://miro.medium.com/v2/resize:fill:64:64/1*z0h5dX6NFLPrQNb--mwteQ.png" alt="author pic" className='rounded-full w-6 border' />

              <div className='text-sm flex items-center gap-1'>
              <span>Name</span>
                <span>.</span>
                <span className='text-gray-600'>Apr 1,2024</span>
              </div>

            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Lorem ipsum dolor sit amet.</h2>
                    <p className='text-serif'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur accusamus quibusdam magnam quidem laborum adipisci ipsa aliquid dolor quasi cumque, aliquam quaerat nihil voluptates voluptas ut porro ea quae officia?</p>
                </div>
                <div>
                    <img src="https://miro.medium.com/v2/resize:fill:112:112/1*Qu8jfX_Ab4objLtUYavRcw.jpeg" alt="blog thumbnail" loading='lazy' />
                </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-2 text-sm'>
              <span className='py-1 px-2 rounded-full bg-gray-100'>blog tag</span>
              <span>5 min read</span>
              </div>
                <div className='flex items-center gap-2 text-gray-600'>
                    <button>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path
                                d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z"
                                fill="#000"
                            />
                        </svg>
                    </button>
                    <button>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" >
                            <path
                                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.25 12h7.5"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                    </button>
                    <button>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.39 12c0 .55.2 1.02.59 1.41.39.4.86.59 1.4.59.56 0 1.03-.2 1.42-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.6-1.41A1.93 1.93 0 0 0 6.4 10c-.55 0-1.02.2-1.41.59-.4.39-.6.86-.6 1.41zM10 12c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.54 0 1.02-.2 1.4-.59.4-.39.6-.86.6-1.41 0-.55-.2-1.02-.6-1.41a1.93 1.93 0 0 0-1.4-.59c-.55 0-1.04.2-1.42.59-.4.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.57 1.41.4.4.88.59 1.43.59.57 0 1.04-.2 1.43-.59.39-.39.57-.86.57-1.41 0-.55-.2-1.02-.57-1.41A1.93 1.93 0 0 0 17.6 10c-.55 0-1.04.2-1.43.59-.38.39-.57.86-.57 1.41z"
                                fill="currentColor"
                            />
                        </svg>

                    </button>


                </div>
            </div>
        </div>
    )
}

export default Blog
