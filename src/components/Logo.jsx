const homeURL = process.env.REACT_APP_HOME_URL;

export default function Logo({ size = 40, source, alt = 'Logo' }) {
    const logoContainerStyle = {
        width: size,
        height: size,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        overflow: 'hidden',
        // boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#fff',
        transition: 'transform 0.3s ease-in-out',
        cursor: 'pointer',
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover',
    };

    return (
        <div style={logoContainerStyle} title="AdsCity" onClick={() => window.location.href = homeURL}>
            <img src={source} alt={alt} style={imageStyle} />
        </div>
    );
}
