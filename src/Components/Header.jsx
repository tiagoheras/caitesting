import "reactjs-popup/dist/index.css";
import UploadFilePopup from "./UploadFilePopup";

function Header({ handleLastUpdatedChange, session }) {
  return (
    <header className="bg-white flex justify-between px-5 py-3">
      <h1>CAI Test</h1>
      <nav>

        <UploadFilePopup
          session={session}
          handleLastUpdatedChange={handleLastUpdatedChange}
        />

      </nav>
    </header >
  );
}

export default Header;
