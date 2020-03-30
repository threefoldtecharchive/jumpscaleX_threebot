import axios from 'axios'

export function getPaste(pasteId) {
    return (axios.get("/jumpscale/pastebin/actors/pastebin/get_paste", {
        "params": {
            "paste_id": pasteId
        }
    }))
}

export function newPaste(code) {
    return (axios.post("/jumpscale/pastebin/actors/pastebin/new_paste", {
        "args": {
            "code": code
        }
    }))
}
