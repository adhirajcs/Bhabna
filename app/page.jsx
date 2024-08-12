import Feed from "@components/Feed"

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                A place to share
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center"> Ideas</span>
            </h1>
            <p className="desc text-center">
                A platform for sharing your ideas with the world.
            </p>

        <Feed />
        </section>
    )
}

export default Home