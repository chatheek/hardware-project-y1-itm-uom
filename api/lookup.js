import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { code } = req.query;

    if (!code) return res.status(400).json({ error: "Code required" });

    const { data, error } = await supabase
        .from('devices')
        .select('local_ip')
        .eq('code', code)
        .single();

    if (error || !data) return res.status(404).json({ error: "Device not found" });
    res.status(200).json({ ip: data.local_ip });
}