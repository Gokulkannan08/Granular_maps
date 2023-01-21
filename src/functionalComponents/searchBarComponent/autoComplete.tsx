import { Card, Typography } from "../../components"

interface AutoComProps {
    loading: boolean
    data: object[]
}



const AutoComplete: React.FC<AutoComProps> = ({ loading, data }) => {
    if (loading) {
        return <Typography variant="body1" color="text" >
            Loading....
        </Typography>
    }
    return <>
        <div style={{ maxHeight: "600px", overflowY: "auto" }} >
            {
                data?.length > 0 ? data.map((item: any) =>
                    <Card variant="list" title={item?.display_name} />
                ) : <div style={{ padding: "16px" }} >
                    <Typography variant="body1" color="disabled" >
                        No matching results
                    </Typography>
                </div>
            }
        </div>

    </>
}

export default AutoComplete;




