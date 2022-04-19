import { useEffect, useState } from "react";
import { getAllBooks } from "../../service/book";
import { Group, Image, Loader, Input } from "@mantine/core";
import { useDebouncedValue, useIntersection } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./styles";
import { Search } from "tabler-icons-react";
interface IBooks {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  thumbnail?: string;
}

function Home() {
  const styles = useStyles();
  const navigate = useNavigate();
  const LIMIT = 10; // data per paginate page
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(0);
  const [books, setBooks] = useState<IBooks[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debounceSearch] = useDebouncedValue(search, 500);
  const [isPaginating, setIsPaginating] = useState(false);
  const [oldSearch, setOldSearch] = useState<string>("");
  const [ref, observer] = useIntersection({
    threshold: 1,
  });

  const fetchData = async (search?: string, startIndex?: number) => {
    try {
      if (typeof startIndex === "number") setIsPaginating(true);
      else setIsLoading(true);
      const res = await getAllBooks(search, startIndex ?? 0, LIMIT);

      if (oldSearch === search)
        setBooks((prev) => [
          ...prev,
          ...res.data.map((book) => ({
            id: book.id,
            authors: book.volumeInfo.authors,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            thumbnail: book.volumeInfo.imageLinks?.thumbnail,
          })),
        ]);
      else {
        setBooks(
          res.data.map((book) => ({
            id: book.id,
            authors: book.volumeInfo.authors,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            thumbnail: book.volumeInfo.imageLinks?.thumbnail,
          }))
        );
        setOldSearch(search!);
      }
      setIsLoading(false);
      setIsPaginating(false);
    } catch (err) {
      console.error(err);
      showNotification({
        color: "red",
        title: "Error",
        message: "Something went wrong. Please try again!",
      });
      setIsLoading(false);
      setIsPaginating(false);
    }
  };

  useEffect(() => {
    fetchData(debounceSearch);
  }, [debounceSearch]);

  useEffect(() => {
    if (observer?.isIntersecting) {
      fetchData(debounceSearch, (activePage + 1) * LIMIT);
      setActivePage((prev) => prev + 1);
    }
  }, [observer]);

  return (
    <div>
      <Input
        icon={<Search />}
        placeholder="Search Books here!"
        value={search}
        onChange={(event: any) => setSearch(event.target.value)}
        className={styles.classes.input}
      />

      {isLoading && (
        <div className={styles.classes.loaderContainer}>
          <Loader variant="bars" />
        </div>
      )}

      {!isLoading &&
        books.length > 0 &&
        books.map((book, index) => (
          <Group
            my={10}
            key={`book-${index}`}
            className={styles.classes.bookContainer}
            px={10}
            onClick={() => navigate(`/details/${book.id}`)}
            ref={books.length - 1 === index ? ref : null}
          >
            <Image
              src={book.thumbnail}
              alt="Book Thumbnail"
              withPlaceholder
              sx={{
                ".mantine-Image-placeholder": {
                  backgroundColor: "#fff",
                },
              }}
            />
            <div>
              <p>
                <strong>Title: </strong>
                {book.title}
              </p>
              <p>
                <strong>Subtitle: </strong>
                {book.subtitle ?? "--"}
              </p>
              <p>
                <strong>Authors: </strong>
                {book.authors?.join(", ")}
              </p>
            </div>
          </Group>
        ))}
      {isPaginating && (
        <div className={styles.classes.loaderContainer}>
          <Loader variant="bars" />
        </div>
      )}
    </div>
  );
}

export default Home;
