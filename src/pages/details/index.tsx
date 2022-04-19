import { Button, Grid, Image, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowBackUp } from "tabler-icons-react";
import { getBookDetailsById } from "../../service/book";
import { showNotification } from "@mantine/notifications";
import { useStyles } from "./styles";
import { pxToRem } from "../../utils/theme.utils";
import { useNavigate } from "react-router-dom";
interface IBookDetails {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  pages: number;
  thumbnail?: string;
  averageRating: number;
  publishedDate: string;
  publisher: string;
  language: string;
  buyLink: string;
}

export default function Details() {
  const params = useParams();
  const styles = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<IBookDetails>({
    id: "",
    title: "",
    subtitle: "",
    authors: [],
    pages: 0,
    thumbnail: "",
    averageRating: 0,
    language: "",
    publisher: "",
    publishedDate: "",
    buyLink: "",
  });

  const fetchDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await getBookDetailsById(params.id!);
      setDetails({
        authors: data.volumeInfo.authors,
        id: data.id,
        pages: data.volumeInfo.pageCount,
        title: data.volumeInfo.title,
        subtitle: data.volumeInfo.subtitle,
        thumbnail: data.volumeInfo.imageLinks?.thumbnail,
        averageRating: data.volumeInfo.averageRating,
        buyLink: data.saleInfo.buyLink,
        language: data.volumeInfo.language,
        publisher: data.volumeInfo.publisher,
        publishedDate: data.volumeInfo.publishedDate,
      });
      console.log(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      showNotification({
        color: "red",
        title: "Error",
        message: "Something went wrong. Please try again!",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <Button
        leftIcon={<ArrowBackUp />}
        mb={30}
        onClick={() => navigate("/search")}
      >
        Back
      </Button>

      {isLoading && (
        <div className={styles.classes.loaderContainer}>
          <Loader variant="bars" />
        </div>
      )}

      {!isLoading && (
        <Grid>
          <Grid.Col xs={12} sm={12} md={6}>
            <div className={styles.classes.imageContainer}>
              <Image
                src={details.thumbnail}
                alt="Image Thumbnail"
                withPlaceholder
                width={pxToRem(200)}
              />
            </div>
          </Grid.Col>
          <Grid.Col xs={12} sm={12} md={6}>
            <div>
              <p>
                <strong>Title: </strong>
                {details.title}
              </p>
              <p>
                <strong>Subtitle: </strong>
                {details.subtitle ?? "--"}
              </p>
              <p>
                <strong>Authors: </strong>
                {details.authors?.join(", ")}
              </p>
              <p>
                <strong>Publisher: </strong>
                {details.publisher}
              </p>
              <p>
                <strong>Published Date: </strong>
                {details.publishedDate}
              </p>
              <p>
                <strong>Pages: </strong>
                {details.pages}
              </p>
              <p>
                <strong>Average Rating: </strong>
                {details.averageRating}
              </p>
              <p>
                <strong>Languange: </strong>
                {new Intl.DisplayNames(["en"], { type: "language" }).of(
                  details.language
                )}
              </p>
              <p>
                <strong>Buy Link: </strong>
                <a href={details.buyLink} target="_blank">
                  {details.buyLink ?? "Book Not Available or Not For Sale"}
                </a>
              </p>
            </div>
          </Grid.Col>
        </Grid>
      )}
    </div>
  );
}
