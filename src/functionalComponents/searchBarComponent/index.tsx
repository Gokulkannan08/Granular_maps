import axios, { AxiosStatic } from "axios";
import { useEffect, useState } from "react";
import { AxiosCall } from "../../api";
import { SearchTextField } from "../../components"
import Button from "../../components/button";
import Grid from "../../components/grid"
import Paper from "../../components/paper"
import { useDebounce } from "../../customHooks";
import AutoComplete from "./autoComplete";


const SearchBarComponent = (props: { updateMap: any; }) => {
  const { updateMap } = props;
  const [search, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<object[]>([]);
  const [buttonloading, setButtonloading] = useState<boolean>(false);
  // const searchValue = useDebounce(search, 100);
  // useEffect(
  //   () => {
  //     if (searchValue) {
  //       let token: AxiosStatic.CancelToken;
  //       if (searchValue.trim().length > 0) {
  //         if (token) {
  //           token.cancel("Cancel request due to new request")
  //         }

  //         token = axios.CancelToken.source()
  //         let url = `${process.env.REACT_APP_NOMINATIMAPI_SEARCH_URL}?q=${searchValue}&format=json&addressdetails=1&extratags=1&polygon_svg=1`;
  //         setLoading(true)
  //         AxiosCall(url, "get", token).then((results) => {
  //           let administrativeType = results.filter(isAdministrativeType);
  //           // console.log("results", administrativeType)
  //           setSuggestion(administrativeType)
  //           setLoading(false)
  //         }).catch((err) => {
  //           console.log(err)
  //         });
  //       }
  //       else {
  //         setLoading(false)
  //         setSuggestion([])
  //       }



  //     } else {
  //       setSuggestion([]);
  //     }
  //   },
  //   [searchValue] // Only call effect if debounced search term changes
  // );

  function isAdministrativeType(item: any, index: number, array: object[]) {
    return (item.type === "administrative");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    setValue(value)
    // if (value.trim().length > 0) {
    //   let url = `${process.env.REACT_APP_NOMINATIMAPI_SEARCH_URL}?q=${value}&format=json&addressdetails=1&extratags=1&polygon_svg=1`;
    //   setLoading(true)
    //   let token = axios.CancelToken.source();
    //   AxiosCall(url, "get", token).then((results) => {
    //     let administrativeType = results.filter(isAdministrativeType);
    //     // console.log("results", administrativeType)

    //     setSuggestion(administrativeType)
    //     setLoading(false)
    //   }).catch((err) => {
    //     console.log(err)
    //   });
    // }
    // else {
    //   setLoading(false)
    //   setSuggestion([])
    // }
  }


  const onSearchButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    setButtonloading(true);
    let value = search;
    setValue(value)

    let url = `${process.env.REACT_APP_NOMINATIMAPI_SEARCH_URL}?q=${value}&format=json&addressdetails=1&extratags=1&polygon_geojson=1&limit=1`;

    let token = axios.CancelToken.source();
    AxiosCall(url, "get", token).then((results) => {
      // console.log("results", results)
      setButtonloading(false)
      updateMap(results[0]);
      setValue("")
    }).catch((err) => {
      console.log(err)
    });

  }


  return (
    <Grid container justifyContent="center" alignItems="center" >
      <Grid item md={12} lg={12} xs={12} justifyContent="center" alignItems="center" >
        <Grid container justifyContent="center" alignItems="center" >
          <Grid item md={8} lg={6} xs={11} >
            <Paper elavation={"1"} style={{ flex: "1 1 auto" }} >
              <div style={{ flex: "1 1 auto" }}>
                <SearchTextField type="text" value={search} onChange={handleChange} placeholder="Search your location" fullWidth />
              </div>

              <div style={{ flex: "0 0 auto" }}>
                {
                  buttonloading ?
                    <Button variant="text"  >
                      Fetching....
                    </Button>
                    :
                    <Button variant="text" onClick={onSearchButtonClicked} disabled={search.trim().length > 0 ? false : true} >
                      Search
                    </Button>
                }

              </div>
            </Paper>

          </Grid>
        </Grid>
      </Grid>
      {
        (loading || suggestion.length) > 0 &&
        <Grid item md={12} lg={12} xs={12} justifyContent="center" alignItems="center" >
          <Grid container justifyContent="center" alignItems="center" >
            <Grid item md={8} lg={6} xs={8}>
              <Paper style={{ marginTop: "8px" }}>
                {/* <div> */}
                <AutoComplete loading={loading} data={suggestion} />

                {/* </div> */}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      }

    </Grid>

  )
}

export default SearchBarComponent