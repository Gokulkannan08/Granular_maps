import { Button, Card, Typography } from "../../components"
interface AutoComProps {
    loading: boolean,
    data: object[],
    onUpdateMap?: any,
    title?: string,
    closeBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}



const AutoComplete: React.FC<AutoComProps> = ({ loading, data, onUpdateMap, title, closeBtnClick }) => {

    const onClick = (item: any) => {
        onUpdateMap(item);
        // console.log(item);
    }



    if (loading) {
        return <Typography style={{ padding: "16px" }} variant="body1" color="text" >
            Loading....
        </Typography>
    }
    return <>
        <div style={{ maxHeight: "350px", overflowY: "auto", flex: 1 }} >
            {title && <div style={{ padding: "16px", display: "flex", justifyContent: 'space-between', alignItems: "center" }} >
                <Typography variant="h5" color="text" >
                    {title}
                </Typography>
                <Button variant="outlined" onClick={closeBtnClick} >
                    Close
                </Button>
            </div>}
            {
                data?.length > 0 ?
                    data?.map((item: any) =>
                        <Card
                            key={item?.place_id}
                            variant="listitem"
                            title={item?.display_name}
                            divider
                            onClick={() => onClick(item)} />
                    ) :

                    <Typography style={{ padding: "16px" }} variant="body1" color="text" >
                        No matching results
                    </Typography>

            }
        </div>

    </>
}

export default AutoComplete;




