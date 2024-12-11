import bookLeafLogo from '../../assets/BookLeaf_Logo_cropped.svg'
const AccountPageLogo = () => {
    return (
        <div className="w-3/4 max-w-xs my-8 flex justify-center">
            <a href="/">
                <img src={bookLeafLogo} alt="BookLeaf"/>
            </a>
        </div>
    )
}

export default AccountPageLogo