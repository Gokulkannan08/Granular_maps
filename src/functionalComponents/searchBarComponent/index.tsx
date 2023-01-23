import axios, { CancelTokenSource } from "axios";
import styles from "./searchbar.module.scss";
import { useEffect, useState } from "react";
import { AxiosCall } from "../../api";
import { Button, Grid, Paper, SearchTextField, Tooltip } from "../../components"
import AutoComplete from "./autoComplete";
import { BiTime, BiSearch } from 'react-icons/bi';
import { MdLocationPin } from 'react-icons/md';
import { useDebounce, useMediaQuery } from "../../customHooks";


const SearchBarComponent = (props: { updateMap: any; recentSearch: object[] }) => {
  const { updateMap, recentSearch } = props;
  const [search, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<object[]>([]);
  const [buttonloading, setButtonloading] = useState<boolean>(false);
  const [showRecent, setShowRecent] = useState<boolean>(false);
  const [showSuggest, setShowSuggest] = useState<boolean>(false);
  const forPhone = useMediaQuery('(min-width: 600px)')
  const debounce = useDebounce(search, 300);
  let token: CancelTokenSource;

  useEffect(() => {
    if (debounce) {
      setShowRecent(false)
      setShowSuggest(true)
      let url = `${process.env.REACT_APP_NOMINATIMAPI_SEARCH_URL}?q=${debounce}&format=json&extratags=1&polygon_geojson=1`;
      setLoading(true)
      let token = axios.CancelToken.source();
      AxiosCall(url, "get", token).then((results) => {
        let administrativeType = results.filter(isAdministrativeType);
        // console.log("results", administrativeType)
        setSuggestion(administrativeType)
        setLoading(false)

      }).catch((err) => {
        console.log(err)
      });
    }

    return () => {

    }
  }, [debounce])


  function isAdministrativeType(item: any, index: number, array: object[]) {
    return (item.type === "administrative");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    setValue(value)
    if (value.trim().length === 0) {
      setShowSuggest(false)
    }

  }


  const onSearchButtonClicked = (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
    setButtonloading(true);
    setShowRecent(false)
    setShowSuggest(false)
    if (token !== undefined) {
      token.cancel()
    }

    let value = search;
    setValue(value)
    let url = `${process.env.REACT_APP_NOMINATIMAPI_SEARCH_URL}?q=${value}&format=json&extratags=1&polygon_geojson=1&limit=1`;
    token = axios.CancelToken.source();
    AxiosCall(url, "get", token).then((results) => {
      if (results.length > 0) {
        setButtonloading(false)
        onUpdateMap(results[0])
      }

    }).catch((err) => {
      console.log(err)
    });

  }

  const onUpdateMap = (obj: any) => {
    if (token !== undefined) {
      token.cancel()
    }
    setValue("")
    setSuggestion([])
    setShowRecent(false)
    setLoading(false)
    setShowSuggest(false)
    updateMap(obj);
  }

  const recentBtnClicked = (event: React.MouseEvent<HTMLDivElement>) => {
    setShowRecent(!showRecent)
  }

  const closeBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowRecent(false)
  }

  const closeSuggestionModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowSuggest(false)
  }


  return (
    <Grid container justifyContent="center" alignItems="center" >
      <Grid item md={12} lg={12} xs={12} justifyContent="center" alignItems="center" >
        <Grid container justifyContent="center" alignItems="center" >
          <Grid item md={8} lg={6} xs={11} >
            <Paper elavation={"1"} style={{ flex: "0 0 auto" }} >
              <>
                <Tooltip text="Recent Search" position={"bottom"} >
                  <div className={styles.icon} onClick={recentBtnClicked}>
                    <BiTime />
                  </div>
                </Tooltip>


                <div style={{ flex: "1 1 auto" }}>
                  <SearchTextField
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search your location"
                    autoFocus
                    fullWidth />
                </div>
                <div style={{ flex: "0 0 auto" }}>
                  {
                    !forPhone ? <>
                      {
                        (buttonloading || search.trim().length === 0) ?
                          <div className={styles.diasbled}>
                            <BiSearch />
                          </div> :
                          <div className={styles.icon} onClick={onSearchButtonClicked}>
                            <BiSearch />
                          </div>
                      }
                    </> : <>
                      {
                        buttonloading ?
                          <Button variant="text"  >
                            {"Fetching...."}
                          </Button>
                          :
                          <Button
                            variant="text"
                            onClick={onSearchButtonClicked}
                            disabled={search.trim().length > 0 ? false : true} >
                            {"Search"}
                          </Button>
                      }
                    </>
                  }

                </div>
              </>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {
        showSuggest &&
        <Grid item md={12} lg={12} xs={12} justifyContent="center" alignItems="center" >
          <Grid container justifyContent="center" alignItems="center" >
            <Grid item md={8} lg={6} xs={11}>
              <Paper style={{ marginTop: "8px" }} direction="column" >
                <AutoComplete
                  loading={loading}
                  data={suggestion}
                  onUpdateMap={onUpdateMap}
                  title={"Suggestions"}
                  closeBtnClick={closeSuggestionModal}
                  icon={<MdLocationPin />} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      }

      {
        showRecent &&
        <Grid item md={12} lg={12} xs={12} justifyContent="center" alignItems="center" >
          <Grid container justifyContent="center" alignItems="center" >
            <Grid item md={8} lg={6} xs={11}>
              <Paper style={{ marginTop: "8px" }} direction="column">
                <AutoComplete
                  loading={false}
                  data={recentSearch}
                  onUpdateMap={onUpdateMap}
                  title={"Recent Search"}
                  closeBtnClick={closeBtnClick}
                  icon={<BiTime />} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      }

    </Grid>

  )
}

export default SearchBarComponent

