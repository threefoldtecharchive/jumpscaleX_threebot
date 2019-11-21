import axios from 'axios'

export function getPaste(pasteId) {
    return (axios.get("/web/gedis/http/pastebin/get_paste", { "params": { "paste_id": pasteId } }))
}

export function newPaste(code) {
    return (axios.post("/web/gedis/http/pastebin/new_paste", { "args": { "code": code } }))
}
