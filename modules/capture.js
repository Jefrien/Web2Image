import { existsSync, mkdirSync } from 'fs'
import { launch } from 'puppeteer'

export const captureScreenshot = async (req, res) => {
    if (!existsSync('screenshots')) {
        mkdirSync('screenshots')
    }

    let browser = null

    try {
        // launch browser
        browser = await launch({ headless: true })
        const page = await browser.newPage()
        
        await page.setViewport({ width: parseInt(req.query.w), height: parseInt(req.query.h) })
        let url = Buffer.from(req.query.url, 'base64').toString('utf-8')
        await page.goto(url, { wait: 'networkidle2' });

        await page.screenshot({ path: `${process.cwd()}/screenshots/image.jpeg` });

    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
        return res.status(500).json({
            message: 'Error in the register',
            error
        })
    } finally {
        if (browser !== null) {           
            console.log('success capture screenshots')            
            //res.set('Content-Type', 'image/jpeg')
            res.sendFile(`${process.cwd()}/screenshots/image.jpeg`)
        }
        await browser.close()
    }

}