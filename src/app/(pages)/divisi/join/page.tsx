const JoinPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-4">Join Us</h1>
            <p className="text-lg text-gray-700 mb-8">
                We are always looking for passionate individuals to join our team.
            </p>
            <a
                href="https://example.com/join"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Apply Now
            </a>
        </div>
    );
};

export default JoinPage;