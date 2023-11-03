import { useAppContext } from "@/contexts/AppContext";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export function useAuth() {
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { connect } = useConnect({
        connector: new InjectedConnector
    })
    const { setAddress, setIsConnected } = useAppContext();

    const handleConnect = async () => {
        try {
            if (isConnected) {
                await handleDisconnect()
            }
            await connect()
            setAddress(address ?? "")
            setIsConnected(isConnected) 
        } catch (e) {
            console.log('Error connecting: ' + e)
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnect() 
        } catch (e) {
            console.log('Error connecting: 0' + e)
        }
    };

    return {
        address,
        isConnected,
        handleConnect,
        handleDisconnect,
    };
}
