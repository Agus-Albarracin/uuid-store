const ErrorPage = () => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 9999, overflow: 'hidden' }}>
            <video
                width="100%"
                height="100%"
                autoPlay
                loop
                muted
                style={{ objectFit: 'cover', backgroundColor: '#000' }}
            >
                <source src="https://res.cloudinary.com/do1hcqjpe/video/upload/v1710754667/q7su0pd7arn7ref6nsuz.mp4" type="video/mp4" />
            </video>
        </div>
    );
}

export default ErrorPage;
