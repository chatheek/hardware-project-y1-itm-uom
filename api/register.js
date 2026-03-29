import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'POST') {
        const { code, ip } = req.body;
        const { error } = await supabase.from('devices').upsert({ code, local_ip: ip });
        if (error) return res.status(500).json(error);
        return res.status(200).send("Registered");
    }
    res.status(405).send("Method Not Allowed");
}