import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const carpetaImagenes = path.resolve(
    __dirname,
    "../../FrontEnd/recursos/imagenes/productos"
);

const subirImagen = multer({
    storage: multer.diskStorage({

        destination: (req, file, cb) => {
            cb(null, carpetaImagenes);
        },

        filename: (req, file, cb) => {
            const nombreArchivo = Date.now() +
                path.extname(file.originalname).toLowerCase();

            cb(null, nombreArchivo);
        }
    }),

    fileFilter: (req, file, cb) => {
        const formatosPermitidos = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (formatosPermitidos.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Formato de imagen no permitido"));
        }
    },

    limits: {
        fileSize: 5 * 1024 * 1024
    }

}).single("imagen");

export default subirImagen;