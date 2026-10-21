import instagram from '../../assets/img/instagram.jpg'
import x from '../../assets/img/x.jpg'
import gallery from '../../assets/img/gallery.png'

type Props = {
  onOpenGallery: () => void
}

export default function HomeScreen({ onOpenGallery }: Props) {
  return (
    <div className="home-screen">
      <div className="apps">
        <div className="instagram">
          <img src={instagram} className="icon" alt="Instagram" />
        </div>
        <div className="x">
          <img src={x} className="icon" alt="X" />
        </div>
        <div className="gallery" onClick={onOpenGallery}>
          <img src={gallery} className="icon" alt="Gallery" />
        </div>
      </div>
    </div>
  )
}