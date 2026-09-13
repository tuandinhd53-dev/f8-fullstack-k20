import UserProfileCard from "./components/UserProfileCard";

function App() {
    return (
        <div className="flex min-h-screen flex-wrap items-center justify-center gap-6 bg-[#121212] p-6">
            <UserProfileCard
                name="Đinh Tuấn"
                jobTitle="Fresher Front-end Developer"
                isOnline={true}
                skills={["HTML", "CSS", "JavaScript"]}
                avatar="https://picsum.photos/200/300"
            />

            <UserProfileCard
                name="Bé Đình"
                jobTitle="Front-end Developer"
                isOnline={false}
                skills={["React", "CSS", "JavaScript"]}
                avatar="https://picsum.photos/200/300"
            />
        </div>
    );
}
export default App;
