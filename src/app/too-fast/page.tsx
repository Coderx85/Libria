const Page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Woah, Slow Down There, Speedy!
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-400 w-3/5">
        Looks like you&pos;re trying to access this page too quickly. Please wait a moment and try again.
      </p>
    </main>
  )
}

export default Page