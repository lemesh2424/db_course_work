import { Router } from "express";
import action from "./action";

const router = Router();

router.get('/health-check', (req, res) => {
    res.send({
        status: 'Success',
        time: Date.now()
    })
});
router.use('/actions', action);

export default router;
