import Link from 'next/link'
import Constant from '@/Constant'

const Hero = () => {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-3xl text-center">
                    <h1
                        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                    >
                        Welcome to Cloud Storage.
                        <br/>
                        <br/>
                        <span className="sm:block text-xl"> Storing everything for you and your business needs. All in one place. </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        {Constant.heroDesc}
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium dark:text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                            href="/register"
                        >
                            Get Started
                        </Link>

                        <Link
                            className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto text-black"
                            href="#"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero