import sys
import fitz
from PyQt5.QtWidgets import QApplication
from PyQt5.QtGui import QImage, QPixmap, QPainter
from PyQt5.QtCore import Qt
import pyperclip


def combine_images(images):
    total_height = sum(img.height() for img in images)
    max_width = max(img.width() for img in images)

    combined_image = QImage(max_width, total_height, QImage.Format_RGB888)
    combined_image.fill(Qt.white)

    painter = QPainter(combined_image)
    current_y = 0
    for img in images:
        painter.drawImage(0, current_y, img)
        current_y += img.height()
    painter.end()

    return combined_image


def pdf_to_clipboard(pdf_file):
    try:
        doc = fitz.open(pdf_file)

        images = []
        for page_number in range(len(doc)):
            page = doc.load_page(page_number)
            pix = page.get_pixmap()
            image = QImage(pix.samples, pix.width, pix.height, pix.stride, QImage.Format_RGB888)
            images.append(image)

        QApplication.clipboard().setPixmap(QPixmap.fromImage(combine_images(images)))

        print(f"All pages ({len(images)}) copied to clipboard successfully")
    except Exception as e:
        print(f"Error: {str(e)}")


if __name__ == "__main__":
    pdf_file_path = pyperclip.paste().removeprefix('"').removesuffix('"')

    if not pdf_file_path.lower().endswith(".pdf"):
        print("Invalid PDF file path")
        sys.exit(1)

    app = QApplication(sys.argv)
    pdf_to_clipboard(pdf_file_path)
