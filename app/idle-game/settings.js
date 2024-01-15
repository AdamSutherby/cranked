const defaultSettings = ({ isVisible, onClose }) => {
    return (
        <div>
            <p>Settings:</p>
            <button onClick={handleCloseSettings}>Close</button>
        </div>
    );
};
export default defaultSettings;